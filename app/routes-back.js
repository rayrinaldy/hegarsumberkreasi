var config = require('../config/config');
var router = require('express').Router();
var passport = require('passport');
var User = require('../app/models/user');

var backRoutes = {
	login: function(req, res){
		res.render('login', {
            config: config,
            message: req.flash('message'),
        });
	},
	register: function(req, res){
		res.render('register', {
            config: config,
            message: req.flash('message'),
        });
	},
	admin: function(req, res){
		res.render('admin', {
            config: config,
            message: req.flash('message'),
            user: req.user, // get the user out of session and pass to template
            csrfToken: req.csrfToken()
        });
	},
	logout: function(req, res){
		req.logout();
        res.redirect('/');
	},
};

module.exports = backRoutes;