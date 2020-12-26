require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const favicon = require('serve-favicon');
const hbs = require('hbs');
const mongoose = require('mongoose');
const logger = require('morgan');
const path = require('path');
const flash = require('connect-flash');

app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

// database configuration
require('./configs/db.config');

// session configuration
require('./configs/session.config')(app);

// passport configuration
const passport = require('passport');
require('./configs/passport.config')(passport);
app.use(passport.initialize());
app.use(passport.session());

// Middleware Setup
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(flash());

// Global vars for flash
/*  app.use((req, res, next) => {
	res.local.success_msg = req.flash('success-msg');
	res.local.error_msg = req.flash('error-msg');
	res.local.error = req.flash('error');
	next();
}); */

// Express View engine setup
app.use(require('node-sass-middleware')({
	src: path.join(__dirname, 'public'),
	dest: path.join(__dirname, 'public'),
	sourceMap: true
}));

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(`${__dirname}/views/partials`);
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

// default value for title local
app.locals.title = 'Express - Generated with IronGenerator';

// routes
app.use('/', require('./routes/apartments'));
app.use('/', require('./routes/users'));

module.exports = app;
