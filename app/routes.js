var config      = require('../config/config');
var router      = require('express').Router();
var passport    = require('passport');
var User        = require('../app/models/user');
var frontRoutes = require('./routes-front');
var backRoutes  = require('./routes-back');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler 
    // Passport adds this method to request object. A middleware is allowed to add properties to request and response objects
    if (req.isAuthenticated()){
        return next();
    } else{
        // if the user is not authenticated then redirect the user to the login page
        req.flash('message', 'Trying to be sneaky eh?');
        res.redirect('/');
    }
};

module.exports = function(passport){

    // •••••••••••••••••••••//
    //         PAGE
    // •••••••••••••••••••••//

    router.get('/', frontRoutes.index);
    router.get('/about', frontRoutes.about);
    router.get('/products', frontRoutes.products);
    router.get('/careers', frontRoutes.careers);
    router.get('/contact', frontRoutes.contacts);

    // •••••••••••••••••••••//
    //        BACKEND
    // •••••••••••••••••••••//

    router.get('/login', backRoutes.login);
    router.get('/admin', backRoutes.admin);
    router.get('/logout', backRoutes.logout);

    router.post('/login', passport.authenticate('login', {
        successRedirect : '/admin', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));

    router.post('/register', passport.authenticate('register', {
        successRedirect: '/admin', // redirect to the secure profile section
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    return router;
};

            