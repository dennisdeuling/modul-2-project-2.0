const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
const User = require('../models/User.model');

module.exports = passport => {
	passport.use(
		new LocalStrategy({
				usernameField: 'email'
			},
			(email, password, done) => {
				User.findOne({email: email})
					.then(user => {
						if (!user) {
							return done(null, false, {message: 'That email is not registered.'});
						}
						if (bcryptjs.compare(password, user.passwordHash)) {
							return done(null, user);
						} else {
							return done(null, false, {message: 'The password is not correct.'});
						}
					})
					.catch(error => {
						console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
					});
			}
		)
	);
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});

	passport.deserializeUser((id, done) => {
		User.findById(id, (error, user) => {
			done(error, user);
		});
	});
};

module.exports.checkAuthenticated = (req, res, next) => {
	const isAuthenticated = req.isAuthenticated();
	if (isAuthenticated) {
		next();
	} else {
		res.redirect('/login');
	}
};