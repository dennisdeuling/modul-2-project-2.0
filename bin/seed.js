const mongoose = require('mongoose');
const database = require('../configs/db.config');
const Apartment = require('../models/Apartment.model');
const User = require('../models/User.model');

const apartments = [{
	_id: new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a4'),
	headline: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
	text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet.',
	city: 'Berlin',
	address: 'Berlinstraße',
	zipCode: '12345',
	country: 'Germany',
	userId: '5ff44349728eb77741a51888',
	location: {
		coordinates: [52.520008, 13.404954]
	},
	images: {
		path: [
			'/uploads/dev-uploads/Berlin/15588243350711_large.jpg',
			'/uploads/dev-uploads/Berlin/15588243949583_large.jpg',
			'/uploads/dev-uploads/Berlin/15588244039635_large.jpg',
			'/uploads/dev-uploads/Berlin/15588244069717_large.jpg',
			'/uploads/dev-uploads/Berlin/15588246150271_large.jpg']
	},
	facilities: {
		wifi: true,
		tv: true,
		washer: true,
		dryer: false,
		dishwasher: false,
		parkinglot: false
	},
	rooms: {
		bedrooms: 1,
		livingrooms: 1,
		bathrooms: 1,
		kitchens: 1
	},
	guests: 2,
	price: 50
}, {
	_id: new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a6'),
	headline: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
	text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet.',
	city: 'Amsterdam',
	address: 'Amsterdamstreet',
	zipCode: '12345',
	country: 'Neverland',
	userId: '5ff44349728eb77741a51888',
	location: {
		coordinates: [52.377956, 4.897070]
	},
	images: {
		path: [
			'/uploads/dev-uploads/Amsterdam/13964494798044_large.jpg',
			'/uploads/dev-uploads/Amsterdam/13964495782833_large.jpg',
			'/uploads/dev-uploads/Amsterdam/13964496355366_large.jpg',
			'/uploads/dev-uploads/Amsterdam/13964496945691_large.jpg',
			'/uploads/dev-uploads/Amsterdam/13964497857207_large.jpg']
	},
	facilities: {
		wifi: true,
		tv: true,
		washer: true,
		dryer: false,
		dishwasher: false,
		parkinglot: false
	},
	rooms: {
		bedrooms: 1,
		livingrooms: 1,
		bathrooms: 1,
		kitchens: 1
	},
	guests: 2,
	price: 50
}, {
	_id: new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a5'),
	headline: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
	text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet.',
	city: 'Paris',
	address: 'Parisstreet',
	zipCode: '12345',
	country: 'France',
	userId: '5ff44349728eb77741a51888',
	location: {
		coordinates: [48.864716, 2.349014]
	},
	images: {
		path: [
			'/uploads/dev-uploads/Paris/143490862897_large.jpg',
			'/uploads/dev-uploads/Paris/1434909103475_large.jpg',
			'/uploads/dev-uploads/Paris/14349081872736_large.jpg',
			'/uploads/dev-uploads/Paris/14349086699575_large.jpg',
			'/uploads/dev-uploads/Paris/14349093216538_large.jpg']
	},
	facilities: {
		wifi: true,
		tv: true,
		washer: true,
		dryer: false,
		dishwasher: false,
		parkinglot: false
	},
	rooms: {
		bedrooms: 1,
		livingrooms: 1,
		bathrooms: 1,
		kitchens: 1
	},
	guests: 2,
	price: 50
}, {
	_id: new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a7'),
	headline: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
	text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet.',
	city: 'London',
	address: 'Londonstreet',
	zipCode: '12345',
	country: 'England',
	userId: '5ff44349728eb77741a51888',
	location: {
		coordinates: [51.50853, -0.12574]
	},
	images: {
		path: [
			'/uploads/dev-uploads/London/15038236696554_large.jpg',
			'/uploads/dev-uploads/London/15038236805652_large.jpg',
			'/uploads/dev-uploads/London/15529124016436_large.jpg',
			'/uploads/dev-uploads/London/15529125322423_large.jpg',
			'/uploads/dev-uploads/London/15529128216073_large.jpg']
	},
	facilities: {
		wifi: true,
		tv: true,
		washer: true,
		dryer: false,
		dishwasher: false,
		parkinglot: false
	},
	rooms: {
		bedrooms: 1,
		livingrooms: 1,
		bathrooms: 1,
		kitchens: 1
	},
	guests: 2,
	price: 50
}, {
	_id: new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a8'),
	headline: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
	text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet.',
	city: 'Rom',
	address: 'Romstreet',
	zipCode: '12345',
	country: 'Italy',
	userId: '5ff4441eb5c7b977e14566c0',
	location: {
		coordinates: [41.9027835, 12.4963655]
	},
	images: {
		path: [
			'/uploads/dev-uploads/Berlin/15588243350711_large.jpg',
			'/uploads/dev-uploads/Berlin/15588243949583_large.jpg',
			'/uploads/dev-uploads/Berlin/15588244039635_large.jpg',
			'/uploads/dev-uploads/Berlin/15588244069717_large.jpg',
			'/uploads/dev-uploads/Berlin/15588246150271_large.jpg']
	},
	facilities: {
		wifi: true,
		tv: true,
		washer: true,
		dryer: false,
		dishwasher: false,
		parkinglot: false
	},
	rooms: {
		bedrooms: 1,
		livingrooms: 1,
		bathrooms: 1,
		kitchens: 1
	},
	guests: 2,
	price: 50
}, {
	_id: new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a9'),
	headline: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
	text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet.',
	city: 'Warschau',
	address: 'Warschaustraße',
	zipCode: '12345',
	country: 'Poland',
	userId: '5ff4441eb5c7b977e14566c0',
	location: {
		coordinates: [52.237049, 21.017532]
	},
	images: {
		path: [
			'/uploads/dev-uploads/Amsterdam/13964494798044_large.jpg',
			'/uploads/dev-uploads/Amsterdam/13964495782833_large.jpg',
			'/uploads/dev-uploads/Amsterdam/13964496355366_large.jpg',
			'/uploads/dev-uploads/Amsterdam/13964496945691_large.jpg',
			'/uploads/dev-uploads/Amsterdam/13964497857207_large.jpg']
	},
	facilities: {
		wifi: true,
		tv: true,
		washer: true,
		dryer: false,
		dishwasher: false,
		parkinglot: false
	},
	rooms: {
		bedrooms: 1,
		livingrooms: 1,
		bathrooms: 1,
		kitchens: 1
	},
	guests: 2,
	price: 50
}, {
	_id: new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4aa'),
	headline: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
	text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet.',
	city: 'Oslo',
	address: 'Oslostreet',
	zipCode: '12345',
	country: 'Norwegian',
	userId: '5ff4441eb5c7b977e14566c0',
	location: {
		coordinates: [59.911491, 10.757933]
	},
	images: {
		path: [
			'/uploads/dev-uploads/Paris/143490862897_large.jpg',
			'/uploads/dev-uploads/Paris/1434909103475_large.jpg',
			'/uploads/dev-uploads/Paris/14349081872736_large.jpg',
			'/uploads/dev-uploads/Paris/14349086699575_large.jpg',
			'/uploads/dev-uploads/Paris/14349093216538_large.jpg']
	},
	facilities: {
		wifi: true,
		tv: true,
		washer: true,
		dryer: false,
		dishwasher: false,
		parkinglot: false
	},
	rooms: {
		bedrooms: 1,
		livingrooms: 1,
		bathrooms: 1,
		kitchens: 1
	},
	guests: 2,
	price: 50
}, {
	_id: new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4ab'),
	headline: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
	text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet.',
	city: 'Lisbon',
	address: 'Lisbonstreet',
	zipCode: '12345',
	country: 'Portugal',
	userId: '5ff4441eb5c7b977e14566c0',
	location: {
		coordinates: [38.71667, -9.13333]
	},
	images: {
		path: [
			'/uploads/dev-uploads/London/15038236696554_large.jpg',
			'/uploads/dev-uploads/London/15038236805652_large.jpg',
			'/uploads/dev-uploads/London/15529124016436_large.jpg',
			'/uploads/dev-uploads/London/15529125322423_large.jpg',
			'/uploads/dev-uploads/London/15529128216073_large.jpg']
	},
	facilities: {
		wifi: true,
		tv: true,
		washer: true,
		dryer: false,
		dishwasher: false,
		parkinglot: false
	},
	rooms: {
		bedrooms: 1,
		livingrooms: 1,
		bathrooms: 1,
		kitchens: 1
	},
	guests: 2,
	price: 50
}, {
	_id: new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a3'),
	headline: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
	text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet.',
	city: 'Madrid',
	address: 'Madridstreet',
	zipCode: '12345',
	country: 'Spain',
	userId: '5ff4441eb5c7b977e14566c0',
	location: {
		coordinates: [40.416775, -3.703790]
	},
	images: {
		path: [
			'/uploads/dev-uploads/Berlin/15588243350711_large.jpg',
			'/uploads/dev-uploads/Berlin/15588243949583_large.jpg',
			'/uploads/dev-uploads/Berlin/15588244039635_large.jpg',
			'/uploads/dev-uploads/Berlin/15588244069717_large.jpg',
			'/uploads/dev-uploads/Berlin/15588246150271_large.jpg']
	},
	facilities: {
		wifi: true,
		tv: true,
		washer: true,
		dryer: false,
		dishwasher: false,
		parkinglot: false
	},
	rooms: {
		bedrooms: 1,
		livingrooms: 1,
		bathrooms: 1,
		kitchens: 1
	},
	guests: 2,
	price: 50
}, {
	_id: new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4ac'),
	headline: 'Lorem ipsum dolor sit amet, consetetur sadipscing',
	text: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet.',
	city: 'Berlin',
	address: 'Musterstraße',
	zipCode: '12345',
	country: 'My Own Country',
	userId: '5ff4441eb5c7b977e14566c0',
	location: {
		coordinates: [52.520008, 13.404954]
	},
	images: {
		path: [
			'/uploads/dev-uploads/Berlin/15588243350711_large.jpg',
			'/uploads/dev-uploads/Berlin/15588243949583_large.jpg',
			'/uploads/dev-uploads/Berlin/15588244039635_large.jpg',
			'/uploads/dev-uploads/Berlin/15588244069717_large.jpg',
			'/uploads/dev-uploads/Berlin/15588246150271_large.jpg']
	},
	facilities: {
		wifi: true,
		tv: true,
		washer: true,
		dryer: false,
		dishwasher: false,
		parkinglot: false
	},
	rooms: {
		bedrooms: 1,
		livingrooms: 1,
		bathrooms: 1,
		kitchens: 1
	},
	guests: 2,
	price: 50
}];

const userApartments1 = [
	new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a4'),
	new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a6'),
	new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a5'),
	new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a7')
];

const userApartments2 = [
	new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a8'),
	new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a9'),
	new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4aa'),
	new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4ab'),
	new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4a3'),
	new mongoose.mongo.ObjectId('5ff848892326ea0ca4cfd4ac')
];


const user = [{
	_id: new mongoose.mongo.ObjectId('5ff44349728eb77741a51888'),
	email: 'bob@bob.de',
	passwordHash: '1234',
	profilePic: '/uploads/dev-uploads/profile-pics/IMG_1508.jpeg',
	name: 'bob',
	apartments: userApartments1
}, {
	_id: new mongoose.mongo.ObjectId('5ff4441eb5c7b977e14566c0'),
	email: 'dennis@dennis.de',
	passwordHash: '1234',
	profilePic: '/uploads/dev-uploads/profile-pics/IMG_1508.jpeg',
	name: 'Dennis',
	apartments: userApartments2
}];

Apartment.create(apartments)
	.then(apartmentsFromDB => {
		console.log(`Created ${apartmentsFromDB.length} Apartments in the database`);
	})
	.catch(error => console.log(error));

User.create(user)
	.then(userFromDB => {
		console.log(`Created ${userFromDB.length} Users in the database`);
	})
	.catch(error => console.log(error));