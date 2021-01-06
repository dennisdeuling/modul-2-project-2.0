const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const apartmentSchema = new Schema({
	headline: {
		type: String,
		// required: true,
		trim: true
	},
	text: {
		type: String,
		// required: true,
		trim: true
	},
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
	},
	rooms: {
		bedrooms: {
			type: Number
			// required: true
		},
		livingrooms: {
			type: Number
			// required: true
		},
		bathrooms: {
			type: Number
			// required: true
		},
		kitchens: {
			type: Number
			// required: true
		}
	},
	guests: {
		type: Number
		// required: true
	},
	price: {
		type: Number
		// required true
	}
}, {
	timestamps: true
});

module.exports = model('Apartment', apartmentSchema);