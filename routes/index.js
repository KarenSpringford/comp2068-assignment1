var express = require('express');
var passport = require('passport');
var router = express.Router();

var User = require('../models/user');

/* Render home page. */
router.get('/', function (req, res, next) {
    res.render('index', { 
        title: 'Home',
        displayName: req.user ? req.user.displayName : ''
    });
});

/* Render About page. */
router.get('/about', function (req, res, next) {
    if (!req.user) {
        res.render('about', {
            title: 'About',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Render Services page. */
router.get('/services', function (req, res, next) {
    if (!req.user) {
        res.render('services', {
            title: 'Services',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Render Projects page. */
router.get('/projects', function (req, res, next) {
    if (!req.user) {
        res.render('projects', {
            title: 'Projects',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Render Contact Me page. */
router.get('/contact', function (req, res, next) {
    if (!req.user) {
        res.render('contact', {
            title: 'Contact',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});


/* Render Login page. */
router.get('/login', function (req, res, next) {
    if (!req.user) {
        res.render('login', {
            title: 'Login',
            messages: req.flash('loginMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/users');
    }
});

/* Process the Login Request */
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/users',
    failureRedirect: '/login',
    failureFlash: true
}));

/* Show Registration Page */
router.get('/register', function (req, res, next) {
    if (!req.user) {
        res.render('register', {
            title: 'Register',
            messages: req.flash('registerMessage'),
            displayName: req.user ? req.user.displayName : ''
        });
    }
    else {
        return res.redirect('/');
    }
});

/* POST signup data. */
router.post('/register', passport.authenticate('local-registration', {
    //Success go to Profile Page / Fail go to Signup page
    successRedirect : '/users',
    failureRedirect : '/register',
    failureFlash : true
}));


/* Process Logout Request */
router.get('/logout', function (req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;
