var loginModel = require('../models/login.js');
var mogoose = require('mongoose');
var express = require('express');
var router = express.Router();

//mostar interfaz de login
router.get('/',function(req, res){
	productoModel.find({}, function(err, logins){
		if(err){
			res.status(404).send(err);
		}
		else {
			res.status(200).send(logins)
		}
	})
});
