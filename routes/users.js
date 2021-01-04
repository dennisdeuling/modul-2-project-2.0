const express = require('express');
const router = express.Router();
const {uploadSingle} = require('../configs/upload-pics-single.config');
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

router.post('/signup', uploadSingle, (req, res, next) => {
	const {email, password} = req.body;
	// const profilePic = req.file.path.replace('public\/', '');

	if (!email || !password) {
		res.locals.error_msg.push('Username and Password are required!');
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
								//profilePic: profilePic
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