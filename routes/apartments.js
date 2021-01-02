const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const {uploadArray} = require('../configs/upload-pics-array.config');
const {checkAuthenticated} = require('../configs/passport.config');
const Apartment = require('../models/Apartment.model');


router.get('/', (req, res, next) => {
	const loggedIn = req.isAuthenticated();
	Apartment.find()
		.then(apartments => {
			res.render('apartments/apartments-list', {apartments, loggedIn: loggedIn});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/search', (req, res, next) => {
	const {city, checkin, checkout, guests} = req.query;
	Apartment.find({city})
		.then(apartments => {
			console.log(apartments);
			res.render('apartments/apartments-searchResults', {apartments});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/apartment/create', checkAuthenticated, (req, res, next) => {
	const loggedIn = req.isAuthenticated();
	res.render('apartments/apartment-create', {loggedIn: loggedIn});
});

router.post('/apartment/create', checkAuthenticated, uploadArray, (req, res, next) => {
	const loggedIn = req.isAuthenticated();
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
					res.render('apartments/apartment-detail', {apartment, loggedIn: loggedIn});
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
	const loggedIn = req.isAuthenticated();
	Apartment.findById(req.params.id)
		.then(apartment => {
			// console.log(apartment);
			res.render('apartments/apartment-detail', {apartment, loggedIn: loggedIn});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.post('/apartment/:id/delete', (req, res, next) => {
	const loggedIn = req.isAuthenticated();
	Apartment.findByIdAndRemove(req.params.id)
		.then(apartmentDeleted => {
			console.log(apartmentDeleted);
			res.redirect('/', {loggedIn: loggedIn});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/apartment/:id/edit', checkAuthenticated, (req, res, next) => {
	const loggedIn = req.isAuthenticated();
	Apartment.findById(req.params.id)
		.then(apartment => {
			// console.log(apartment);
			res.render('apartments/apartment-edit', {apartment, loggedIn: loggedIn});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.post('/apartment/:id/edit', checkAuthenticated, (req, res, next) => {
	const loggedIn = req.isAuthenticated();
	Apartment.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then(apartmentNew => {
			// console.log(`Updated apartment: ${apartmentNew}`);
			res.redirect(`/apartment/${req.params.id}`, {loggedIn: loggedIn});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/my-apartments', checkAuthenticated, (req, res, next) => {
	const userId = req.session.passport.user;
	const loggedIn = req.isAuthenticated();
	Apartment.find({userId: userId})
		.then(apartments => {
			// console.log(apartments);
			res.render('apartments/my-apartments', {apartments, loggedIn: loggedIn});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

module.exports = router;