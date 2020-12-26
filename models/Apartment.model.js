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
	userId: {
		type: String,
		required: true
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
	}
}, {
	timestamps: true
});

module.exports = model('Apartment', apartmentSchema);