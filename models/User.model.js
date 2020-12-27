const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const userSchema = new Schema({
	email: {
		type: String,
		required: [true, 'An email is required'],
		// unique: true,
		lowercase: true,
		trim: true
		// match: [/^\S+@\S+\.\S+$/, 'Please use a valid email.']
	},
	passwordHash: {
		type: String,
		required: [true, 'A password is required']
	},
	profilePic: {
		type: String
		// required: true
	}
}, {
	timestamps: true
});

module.exports = model('User', userSchema);