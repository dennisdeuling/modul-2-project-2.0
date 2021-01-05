const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const apartmentSchema = new Schema({
	city: {
		type: String,
		required: true,
		trim: true
	},
	address: {
		type: String,
		required: true,
		trim: true
	},
	zipCode: {
		type: String,
		required: true,
		trim: true
	},
	country: {
		type: String,
		required: true,
		trim: true
	},
	booked: {
		checkin: [String],
		checkout: [String]
	},
	userId: {
		type: String
		// required: true
	},
	location: {
		type: {
			type: String,
			enum: ['Point']
			// required: true
		},
		coordinates: {
			type: [Number]
			// required: true
		}
	},
	images: {
		path: [String]
	},
	facilities: {
		wifi: Boolean,
		tv: Boolean,
		washer: Boolean,
		dryer: Boolean,
		dishwasher: Boolean,
		parkinglot: Boolean
	}
}, {
	timestamps: true
});

module.exports = model('Apartment', apartmentSchema);