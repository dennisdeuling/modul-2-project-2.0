const mongoose = require('mongoose');
const database = require('../configs/db.config');
const Apartment = require('../models/Apartment.model');

const apartments = [{
	city: 'Berlin',
	address: 'Berlinstraße',
	zipCode: '12345',
	country: 'Germany'
},{
	city: 'Amsterdam',
	address: 'Amsterdamstreet',
	zipCode: '12345',
	country: 'Neverland'
},{
	city: 'Paris',
	address: 'Parisstreet',
	zipCode: '12345',
	country: 'France'
},{
	city: 'London',
	address: 'Londonstreet',
	zipCode: '12345',
	country: 'England'
},{
	city: 'Rom',
	address: 'Romstreet',
	zipCode: '12345',
	country: 'Italy'
},{
	city: 'Warschau',
	address: 'Warschaustraße',
	zipCode: '12345',
	country: 'Poland'
},{
	city: 'Oslo',
	address: 'Oslostreet',
	zipCode: '12345',
	country: 'Norwegian'
},{
	city: 'Lissabon',
	address: 'Lissabonstreet',
	zipCode: '12345',
	country: 'Portugal'
},{
	city: 'Madrid',
	address: 'Madridstreet',
	zipCode: '12345',
	country: 'Spain'
},{
	city: 'Berlin',
	address: 'Musterstraße',
	zipCode: '12345',
	country: 'My Own Country'
}];

Apartment.create(apartments)
	.then(apartmentsFromDB => {
		console.log(`Created ${apartmentsFromDB.length} Aparments in the database`);
	})
	.catch(error => console.log(error));