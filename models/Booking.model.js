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