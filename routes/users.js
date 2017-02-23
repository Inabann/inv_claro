var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./../models/user');
var jwt = require('jsonwebtoken');
var secret = 'global';

//registrar un usuario
router.post('/', function(req,res){
	var user = new User();
	user.username = req.body.username;
	user.password = req.body.password;
	user.save(function(err){
		if (err) {
			res.json({success: false, message: 'Usuario existente'});
		} else{
			res.json({success: true, message: 'Usuario creado'});
		}
	});
});

//login
//http://localhost:port/inv/users/auth
router.post('/auth', function(req, res){
	User.findOne({username: req.body.username}).exec(function(err, user){
		if (err) throw err;

		if (!user) {
			res.json({success: false, message: 'usuario no registrado'});
		} else if (user) {
			if (req.body.password) {
				var validPassword = user.comparePassword(req.body.password);
				if (!validPassword) {
					res.json({success: false, message: 'contraseña incorrecta'});
				} else {
					var token = jwt.sign({username: user.username}, secret, {expiresIn: '24h'});
					res.json({success: true, message: 'usuario y contraseña correctos', token: token});
				}
			} else {
				res.json({success: false, message: 'ingrese contraseña'});
			}
		}
	});
});

router.use(function(req,res,next){
	var token = req.body.token || req.body.query || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, secret, function(err, decoded){
			if (err) {
				res.json({success: false, message: 'token invalido'});
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		res.json({success: false, message: 'no se encontro token'});
	}
});

router.post('/me', function(req, res){
	res.json(req.decoded);
});

module.exports = router;
