const mongoose = require('mongoose');
const database = require('../configs/db.config');
const Apartment = require('../models/Apartment.model');

const apartments = [{
	city: 'Berlin',
	address: 'Berlinstraße',
	zipCode: '12345',
	country: 'Germany',
	booked: {
		checkin: ['2021-01-03', '2021-01-03', '2021-01-03'],
		checkout: ['2021-01-06', '2021-01-06', '2021-01-06']
	},
	userId: 802340389,
	coordinates: [52.520008, 13.404954],
	images: {
		path: [
			'uploads/dev-uploads/Berlin/15588243350711_large.jpg',
			'uploads/dev-uploads/Berlin/15588243949583_large.jpg',
			'uploads/dev-uploads/Berlin/15588244039635_large.jpg',
			'uploads/dev-uploads/Berlin/15588244069717_large.jpg',
			'uploads/dev-uploads/Berlin/15588246150271_large.jpg']
	}
}, {
	city: 'Amsterdam',
	address: 'Amsterdamstreet',
	zipCode: '12345',
	country: 'Neverland',
	booked: {
		checkin: '2021-01-03',
		checkout: '2021-01-06'
	},
	userId: 802340389,
	coordinates: [52.377956, 4.897070],
	images: {
		path: [
			'uploads/dev-uploads/Amsterdam/13964494798044_large.jpg',
			'uploads/dev-uploads/Amsterdam/13964495782833_large.jpg',
			'uploads/dev-uploads/Amsterdam/13964496355366_large.jpg',
			'uploads/dev-uploads/Amsterdam/13964496945691_large.jpg',
			'uploads/dev-uploads/Amsterdam/13964497857207_large.jpg']
	}
}, {
	city: 'Paris',
	address: 'Parisstreet',
	zipCode: '12345',
	country: 'France',
	booked: {
		checkin: '2021-01-03',
		checkout: '2021-01-06'
	},
	userId: 802340389,
	coordinates: [48.864716, 2.349014],
	images: {
		path: [
			'uploads/dev-uploads/Paris/143490862897_large.jpg',
			'uploads/dev-uploads/Paris/1434909103475_large.jpg',
			'uploads/dev-uploads/Paris/14349081872736_large.jpg',
			'uploads/dev-uploads/Paris/14349086699575_large.jpg',
			'uploads/dev-uploads/Paris/14349093216538_large.jpg']
	}
}, {
	city: 'London',
	address: 'Londonstreet',
	zipCode: '12345',
	country: 'England',
	booked: {
		checkin: '2021-01-03',
		checkout: '2021-01-06'
	},
	userId: 802340389,
	coordinates: [51.50853, -0.12574],
	images: {
		path: [
			'uploads/dev-uploads/London/15038236696554_large.jpg',
			'uploads/dev-uploads/London/15038236805652_large.jpg',
			'uploads/dev-uploads/London/15529124016436_large.jpg',
			'uploads/dev-uploads/London/15529125322423_large.jpg',
			'uploads/dev-uploads/London/15529128216073_large.jpg']
	}
}, {
	city: 'Rom',
	address: 'Romstreet',
	zipCode: '12345',
	country: 'Italy',
	booked: {
		checkin: '2021-01-03',
		checkout: '2021-01-06'
	},
	userId: 802340389,
	coordinates: [41.9027835, 12.4963655],
	images: {
		path: [
			'uploads/dev-uploads/Berlin/15588243350711_large.jpg',
			'uploads/dev-uploads/Berlin/15588243949583_large.jpg',
			'uploads/dev-uploads/Berlin/15588244039635_large.jpg',
			'uploads/dev-uploads/Berlin/15588244069717_large.jpg',
			'uploads/dev-uploads/Berlin/15588246150271_large.jpg']
	}
}, {
	city: 'Warschau',
	address: 'Warschaustraße',
	zipCode: '12345',
	country: 'Poland',
	booked: {
		checkin: '2021-01-03',
		checkout: '2021-01-06'
	},
	userId: 802340389,
	coordinates: [52.237049, 21.017532],
	images: {
		path: [
			'uploads/dev-uploads/Amsterdam/13964494798044_large.jpg',
			'uploads/dev-uploads/Amsterdam/13964495782833_large.jpg',
			'uploads/dev-uploads/Amsterdam/13964496355366_large.jpg',
			'uploads/dev-uploads/Amsterdam/13964496945691_large.jpg',
			'uploads/dev-uploads/Amsterdam/13964497857207_large.jpg']
	}
}, {
	city: 'Oslo',
	address: 'Oslostreet',
	zipCode: '12345',
	country: 'Norwegian',
	booked: {
		checkin: '2021-01-03',
		checkout: '2021-01-06'
	},
	userId: 802340389,
	coordinates: [59.911491, 10.757933],
	images: {
		path: [
			'uploads/dev-uploads/Paris/143490862897_large.jpg',
			'uploads/dev-uploads/Paris/1434909103475_large.jpg',
			'uploads/dev-uploads/Paris/14349081872736_large.jpg',
			'uploads/dev-uploads/Paris/14349086699575_large.jpg',
			'uploads/dev-uploads/Paris/14349093216538_large.jpg']
	}
}, {
	city: 'Lisbon',
	address: 'Lisbonstreet',
	zipCode: '12345',
	country: 'Portugal',
	booked: {
		checkin: '2021-01-03',
		checkout: '2021-01-06'
	},
	userId: 802340389,
	coordinates: [38.71667, -9.13333],
	images: {
		path: [
			'uploads/dev-uploads/London/15038236696554_large.jpg',
			'uploads/dev-uploads/London/15038236805652_large.jpg',
			'uploads/dev-uploads/London/15529124016436_large.jpg',
			'uploads/dev-uploads/London/15529125322423_large.jpg',
			'uploads/dev-uploads/London/15529128216073_large.jpg']
	}
}, {
	city: 'Madrid',
	address: 'Madridstreet',
	zipCode: '12345',
	country: 'Spain',
	booked: {
		checkin: '2021-01-03',
		checkout: '2021-01-06'
	},
	userId: 802340389,
	coordinates: [40.416775, -3.703790],
	images: {
		path: [
			'uploads/dev-uploads/Berlin/15588243350711_large.jpg',
			'uploads/dev-uploads/Berlin/15588243949583_large.jpg',
			'uploads/dev-uploads/Berlin/15588244039635_large.jpg',
			'uploads/dev-uploads/Berlin/15588244069717_large.jpg',
			'uploads/dev-uploads/Berlin/15588246150271_large.jpg']
	}
}, {
	city: 'Berlin',
	address: 'Musterstraße',
	zipCode: '12345',
	country: 'My Own Country',
	booked: {
		checkin: '2021-01-03',
		checkout: '2021-01-06'
	},
	userId: 802340389,
	coordinates: [52.520008, 13.404954],
	images: {
		path: [
			'uploads/dev-uploads/Berlin/15588243350711_large.jpg',
			'uploads/dev-uploads/Berlin/15588243949583_large.jpg',
			'uploads/dev-uploads/Berlin/15588244039635_large.jpg',
			'uploads/dev-uploads/Berlin/15588244069717_large.jpg',
			'uploads/dev-uploads/Berlin/15588246150271_large.jpg']
	}
}];

Apartment.create(apartments)
	.then(apartmentsFromDB => {
		console.log(`Created ${apartmentsFromDB.length} Aparments in the database`);
	})
	.catch(error => console.log(error));