const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const {uploadArray} = require('../configs/upload-pics-array.config');
const {checkAuthenticated} = require('../configs/passport.config');
const Apartment = require('../models/Apartment.model');


router.get('/', (req, res, next) => {
	Apartment.find()
		.then(apartments => {
			res.render('apartments/apartments-list', {apartments});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/search', (req, res, next) => {
	const {city, checkin, checkout, guests} = req.query;
	const dataQuery = [];
	let query;

	if (city) {
		dataQuery.push({city: city});
	}
	if (checkin) {
		dataQuery.push({'booked.checkin': {$gt: [checkin]}});
	}
	if (checkout) {
		dataQuery.push({'booked.checkout': {$lt: [checkout]}});
	}
	/*
	if (guests) {
		dataQuery.push({guests: guests});
	} */

	if (dataQuery.length == 1) {
		query = dataQuery[0];
	} else if (dataQuery.length > 1) {
		query = {$and: dataQuery};
	}

	Apartment
		.find(query)
		.then(apartment => {
			console.log(apartment);
			res.render('apartments/apartments-searchResults', {apartment});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/apartment/create', checkAuthenticated, (req, res, next) => {
	res.render('apartments/apartment-create');
});

router.post('/apartment/create', checkAuthenticated, uploadArray, (req, res, next) => {
	const {address, zipCode, city, country} = req.body;
	let data = {};
	const uploadedPics = [];
	req.files.forEach(pics => {
		uploadedPics.push(pics.path);
	});

	const getCoordinates = async () => {
		const response = await fetch(encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}+${zipCode}+${city}+${country}&key=${process.env.GOOGLE_MAPS_API_KEY}`));
		const data = await response.json();
		const location = data.results[0].geometry.location;
		const coordinates = [location.lat, location.lng];
		return coordinates;
	};

	getCoordinates()
		.then(response => {
			data = {
				address: req.body.address,
				zipCode: req.body.zipCode,
				city: req.body.city,
				country: req.body.country,
				userId: req.session.passport.user,
				location: {
					coordinates: response
				},
				images: {
					path: uploadedPics
				}
			};
		})
		.then(() => {
			Apartment.create(data)
				.then(apartment => {
					console.log(apartment);
					res.render('apartments/apartment-detail', {apartment});
				})
				.catch(error => {
					console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
				});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/apartment/:id', (req, res, next) => {
	Apartment.findById(req.params.id)
		.then(apartment => {
			// console.log(apartment);
			res.render('apartments/apartment-detail', {apartment});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.post('/apartment/:id/book', (req, res, next) => {
	Apartment.findById(req.params.id)
		.then(apartment => {
			// console.log(apartment);
			res.render('apartments/apartment-detail', {apartment});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.post('/apartment/:id/delete', (req, res, next) => {
	Apartment.findByIdAndRemove(req.params.id)
		.then(apartmentDeleted => {
			console.log(apartmentDeleted);
			res.redirect('/');
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/apartment/:id/edit', checkAuthenticated, (req, res, next) => {
	Apartment.findById(req.params.id)
		.then(apartment => {
			// console.log(apartment);
			res.render('apartments/apartment-edit', {apartment});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.post('/apartment/:id/edit', checkAuthenticated, (req, res, next) => {
	Apartment.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then(apartmentNew => {
			// console.log(`Updated apartment: ${apartmentNew}`);
			res.redirect(`/apartment/${req.params.id}`);
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/my-apartments', checkAuthenticated, (req, res, next) => {
	const userId = req.session.passport.user;
	Apartment.find({userId: userId})
		.then(apartments => {
			// console.log(apartments);
			res.render('apartments/my-apartments', {apartments});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

module.exports = router;