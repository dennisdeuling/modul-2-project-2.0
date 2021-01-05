const express = require('express');
const router = express.Router();
const {uploadArray} = require('../configs/upload-pics-array.config');
const {checkAuthenticated} = require('../configs/passport.config');
const User = require('../models/User.model');

// bcryptjs and session
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const saltRounds = 10;

// passport
const passport = require('passport');

router.get('/signup', (req, res, next) => {
	res.render('users/signup');
});

router.post('/signup', uploadArray, (req, res, next) => {
	const {email, password} = req.body;
	const uploadedPic = [];
	req.files.forEach(pics => {
		if (pics.path) {
			pics.path = pics.path.replace('public\/', '');
			console.log('in function: ', pics.path);
			uploadedPic.push(pics.path);
		}
	});

	if (!email || !password || uploadedPic == 0) {
		res.locals.error_msg.push('Username, Password and a Profile Pic is required!');
		res.render('users/signup');
	}

	if (email) {
		User.findOne({email: email})
			.then(userFromDB => {
				if (userFromDB) {
					console.log('userFromDB: true');
					req.flash('warning_msg', `This email ${email} already exists! Please login!`);
					res.redirect('/login');
				} else {
					console.log('userFromDB: false');
					bcryptjs
						.genSalt(saltRounds)
						.then(salt => {
							return bcryptjs.hash(password, salt);
						})
						.then(hashedPassword => {
							return User.create({
								email,
								passwordHash: hashedPassword
								// profilePic: uploadedPic[0]
							});
						})
						.then(userFromDB => {
							req.flash('success_msg', `Your Account with the email ${email} is created! Please login!`);
							res.redirect('/login');
						})
						.catch(error => {
							console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
						});
				}
			})
			.catch(error => {
				console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
			});
	}
});

router.get('/signup/success', (req, res, next) => {
	res.render('users/success-message');
});

router.get('/login', (req, res, next) => {
	console.log(res.locals);
	res.render('users/login');
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login'
	})(req, res, next);
});

router.get('/logout', checkAuthenticated, (req, res, next) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;