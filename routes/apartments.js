const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const {uploadArray} = require('../configs/upload-pics-array.config');
const {checkAuthenticated} = require('../configs/passport.config');
const Apartment = require('../models/Apartment.model');
const User = require('../models/User.model');
const Booking = require('../models/Booking.model');


router.get('/', (req, res, next) => {
	const session = req.session;
	Apartment.find()
		.then(apartments => {
			res.render('apartments/apartments-list', {
				apartments,
				session,
				loggedIn: res.locals.user
			});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});


router.get('/search', (req, res, next) => {
	const {city, checkin, checkout, guests} = req.query;
	let dataQuery;
	req.session.checkin = checkin || '';
	req.session.checkout = checkout || '';
	const session = req.session;

	if (city || guests || checkin || checkout) {
		dataQuery = {$or: [{city: city}, {guests: {$gte: guests}}, {'booking.checkin': {$lt: [checkin]}}, {'booking.checkout': {$gt: [checkout]}}]};
	}


	/*
	console.log('checkin.... ' + checkin);
	console.log('checkout.... ' + checkout);

	Apartment.aggregate([
		{'$match': {city: city}},
		{
			'$project': {
				'city': 1,
				'booking': {
					'$filter': {
						'input': '$booking',
						'as': 'booking',
						'cond': [
							{
								'$or': [
									{'$gt': ['$booking.checkin', 10]},
									{'$lt': ['$booking.checkout', 20]}
								]
							}
						]
					}
				}
			}
		}
	], function (err, apartments) {
		console.log('list of appts....');
		console.log(apartments);
	});

	 */

	Apartment
		.find()
		.populate('booking', '', 'Booking')
		.find(dataQuery)
		.then(apartments => {
			console.log(apartments);
			console.log(session);
			console.log('....');
			console.log('Checking: ', apartments[0].booking[0].checkin);
			console.log('Checkout: ', apartments[0].booking[0].checkout);
			res.render('apartments/apartments-list', {
				apartments,
				session,
				loggedIn: res.locals.user
			});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/apartment/create', checkAuthenticated, (req, res, next) => {
	res.render('apartments/apartment-create', {loggedIn: res.locals.user});
});

router.post('/apartment/create', checkAuthenticated, uploadArray, (req, res, next) => {
	const userId = req.session.passport.user;
	let data = {};
	const uploadedPics = [];
	req.files.forEach(pics => {
		if (pics.path) {
			pics.path = pics.path.replace('public', '');
			uploadedPics.push(pics.path);
		}
	});

	const getCoordinates = async () => {
		const response = await fetch(encodeURI(`https://maps.googleapis.com/maps/api/geocode/json?address=${req.body.address}+${req.body.zipCode}+${req.body.city}+${req.body.country}&key=${process.env.GOOGLE_GEOCODING_API}`));
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
					User.findByIdAndUpdate(data.userId, {$push: {apartments: apartment.id}}, {new: true})
						.then(user => {
							res.render('apartments/apartment-detail', {
								apartment,
								loggedIn: res.locals.user
							});
						})
						.catch(error => {
							console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
						});
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
	const session = req.session;


	Apartment.findById(req.params.id)
		.populate('userId')
		.then(apartment => {
			console.log('Apartment-Detail: ', apartment);
			res.render('apartments/apartment-detail', {apartment, loggedIn: res.locals.user});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.post('/apartment/:id/book', (req, res, next) => {

	Apartment.findById(req.params.id)
		.then(apartment => {
			const data = {
				userId: req.user.id,
				city: apartment.city,
				price: apartment.price,
				apartmentId: req.params.id,
				checkin: req.body.checkin,
				checkout: req.body.checkout
			};
			Booking.create(data)
				.then(booking => {

					Apartment.findByIdAndUpdate(data.apartmentId, {$push: {booking: booking.id}}, {new: true})
						.then(apartmentNew => {
							User.findByIdAndUpdate(data.userId, {$push: {booking: booking.id}}, {new: true})
								.then(user => {

									req.flash('success_msg', `You have booked this apartment from ${booking.checkin} to ${booking.checkout}.`);
									res.redirect(`/apartment/${req.params.id}`);
								})
								.catch(error => {
									console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
								});
						})
						.catch(error => {
							console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
						});

				})
				.catch(error => {
					console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
				});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.post('/apartment/:id/delete', (req, res, next) => {
	Apartment.findByIdAndRemove(req.params.id)
		.then(apartmentDeleted => {
			console.log(apartmentDeleted);
			res.redirect('/dashboard');
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/apartment/:id/edit', checkAuthenticated, (req, res, next) => {
	Apartment.findById(req.params.id)
		.then(apartment => {
			console.log(apartment);
			res.render('apartments/apartment-edit', {apartment, loggedIn: res.locals.user});
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

module.exports = router;