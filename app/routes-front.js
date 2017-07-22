var config = require('../config/config');
var router = require('express').Router();
var passport = require('passport');
var User = require('../app/models/user');

var frontRoutes = {
	index: function(req, res){
		res.render('index', {
            config: config,
            message: req.flash('message'),
        });
	},
	about: function(req, res){
		res.render('about', {
            config: config,
            message: req.flash('message'),
        });
	},
	products: function(req, res){
		res.render('products', {
            config: config,
            message: req.flash('message'),
        });
	},
	careers: function(req, res){
		res.render('careers', {
            config: config,
            message: req.flash('message'),
        });
	},
	contacts: function(req, res){
		res.render('contacts', {
            config: config,
            message: req.flash('message'),
        });
	}
};

module.exports = frontRoutes;