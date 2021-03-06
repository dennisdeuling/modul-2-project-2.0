const express = require('express');
const router = express.Router();
const {uploadArray} = require('../configs/upload-pics-array.config');
const {checkAuthenticated} = require('../configs/passport.config');
const User = require('../models/User.model');
const Apartment = require('../models/Apartment.model');

// bcryptjs and session
const bcryptjs = require('bcryptjs');
const session = require('express-session');
const saltRounds = 10;

// passport
const passport = require('passport');

router.get('/signup', (req, res, next) => {
	res.render('users/signup', {loggedIn: res.locals.user});
});

router.post('/signup', uploadArray, (req, res, next) => {
	const {email, password} = req.body;
	const uploadedPic = [];
	req.files.forEach(pics => {
		if (pics.path) {
			pics.path = pics.path.replace('public', '');
			uploadedPic.push(pics.path);
		}
	});

	if (!email || !password || uploadedPic == 0) {
		res.locals.error_msg.push('Username, Password and a Profile Pic is required!');
		res.render('users/signup');
		return;
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
							req.flash('success_msg', `Your Account with the email ${email} has been created! Please login!`);
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

router.get('/login', (req, res, next) => {
	res.render('users/login', {loggedIn: res.locals.user});
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/login'
	})(req, res, next);
});

router.get('/dashboard', checkAuthenticated, (req, res, next) => {
	const userId = req.session.passport.user;

	User
		.findById(userId)
		.populate('apartments', '', 'Apartment', '')
		.populate('booking', '', 'Booking', '')
		.then(dataFromDB => {
			console.log(dataFromDB);
			res.render('users/dashboard', {dataFromDB, loggedIn: res.locals.user});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/:id/edit', checkAuthenticated, (req, res, next) => {
	User.findById(req.params.id)
		.then(user => {
			console.log(user);
			res.render('users/edit', {user, loggedIn: res.locals.user});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.post('/:id/edit', checkAuthenticated, uploadArray, (req, res, next) => {
	const {email, password} = req.body;
	const uploadedPic = [];
	req.files.forEach(pics => {
		if (pics.path) {
			pics.path = pics.path.replace('public', '');
			uploadedPic.push(pics.path);
		}
	});

	if (!email || !password || uploadedPic == 0) {
		res.locals.error_msg.push('Username, Password and a Profile Pic is required!');
		res.render('users/edit');
		return;
	}

	User.findByIdAndUpdate(req.params.id, req.body, {new: true})
		.then(userFromDB => {
			bcryptjs
				.genSalt(saltRounds)
				.then(salt => {
					return bcryptjs.hash(password, salt);
				})
				.then(hashedPassword => {
					return User.create({
						email,
						passwordHash: hashedPassword,
						profilePic: uploadedPic[0]
					});
				})
				.then(userFromDB => {
					req.flash('success_msg', `Your account is updated.`);
					res.redirect('/dashboard');
				})
				.catch(error => {
					console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
				});
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.post('/:id/delete', (req, res, next) => {
	User.findByIdAndRemove(req.params.id)
		.then(apartmentDeleted => {
			console.log(apartmentDeleted);
			req.flash('success_msg', `Your account is deleted.`);
			res.redirect('/');
		})
		.catch(error => {
			console.log(`I'm sorry but an error happened. Check this out bro: ${error}`);
		});
});

router.get('/logout', checkAuthenticated, (req, res, next) => {
	req.logout();
	req.session.destroy();
	res.redirect('/');
});

module.exports = router;