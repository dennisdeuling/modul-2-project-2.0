const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const bookingSchema = new Schema({
	userId: {
		type: Schema.Types.ObjectId,
		ref: 'User'
		// required: true
	},
	apartmentId: {
		type: Schema.Types.ObjectId,
		ref: 'Apartment'
		// required: true
	},
	city: {
		type: String
		// required: true
	},
	price: {
		type: String
		// required: true
	},
	checkin: {
		type: String
		// required: true
	},
	checkout: {
		type: String
		// required: true
	}
}, {
	timestamps: true
});

module.exports = model('Booking', bookingSchema);