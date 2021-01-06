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
	let data = {};
	const uploadedPics = [];
	req.files.forEach(pics => {
		if (pics.path) {
			pics.path = pics.path.replace('public', '');
			uploadedPics.push(pics.path);
		}
	});

	const getCoordinates = async () => {
		const response = await fetch(encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}+${req.body.zipCode}+${req.body.city}+${req.body.country}&key=${process.env.GOOGLE_MAPS_API_KEY}`));
		const data = await response.json();
		const location = data.results[0].geometry.location;
		const coordinates = [location.lat, location.lng];
		return coordinates;
	};

	getCoordinates()
		.then(response => {
			data = {
				headline: req.body.headline,
				address: req.body.address,
				zipCode: req.body.zipCode,
				city: req.body.city,
				country: req.body.country,
				userId: req.session.passport.user,
				text: req.body.text,
				location: {
					coordinates: response
				},
				images: {
					path: uploadedPics
				},
				facilities: {
					wifi: req.body.wifi || false,
					tv: req.body.tv || false,
					washer: req.body.washer || false,
					dryer: req.body.dryer || false,
					dishwasher: req.body.dishwasher || false,
					parkinglot: req.body.parkinglot || false
				},
				rooms: {
					bedrooms: req.body.bedrooms,
					livingrooms: req.body.livingrooms,
					bathrooms: req.body.bathrooms,
					kitchens: req.body.kitchens
				},
				guests: req.body.guests,
				price: req.body.price
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
			console.log('Apartment-Detail: ', apartment);
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
			console.log(apartment);
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