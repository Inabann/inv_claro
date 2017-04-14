var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('./../models/user');
var jwt = require('jsonwebtoken');
var secret = 'global';

//registrar un usuario
router.post('/', function(req,res){
	var user = new User();
	user.nombre = req.body.nombre;
	user.username = req.body.username;
	user.password = req.body.password;
	user.save(function(err){
		if (err) {
			res.json({success: false, message: 'Usuario existente'});
			console.log(err);
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

router.get('/permission', function(req, res){
	User.findOne({username: req.decoded.username}, function(err, user){
		if (err) throw err;
		if (!user) {
			res.json({success: false, message: 'no se encontro usuario'});
		} else {
			res.json({ success: true, permission: user.permission });
		}
	});
});

router.get('/admin', function(req, res){
	User.find({}, function(err, users){
		if (err) throw err;
		User.findOne({username: req.decoded.username}, function(err, mainUser){
			if (err) throw err;
			if (!mainUser) {
				res.json({success: false, message: 'No se encontro usuario'});
			} else {
				if (mainUser.permission === 'admin' || mainUser.permission === 'moderador') {
					if (!users) {
						res.json({success: false, message: 'Usuarios no encontrados'});
					} else {
						res.json({success: true, users: users, permission: mainUser.permission});
					}
				} else {
					res.json({success: false, message: 'Permiso insuficiente'});
				}
			}
		});
	});
});

router.delete('/:username', function(req, res){
	var deleteUser = req.params.username;
	User.findOne({username: req.decoded.username}, function(err, mainUser){
		if (err) throw err;
		if (!mainUser) {
			res.json({success: false, message: 'no se encontro usuario'});
		} else {
			if (mainUser.permission != 'admin') {
				res.json({success: false, message: 'permiso insuficinete'});
			} else {
				User.findOneAndRemove({username: deleteUser}, function(err, user){
					if (err) throw err;
					res.json({success: true});
				});
			}
		}
	});
});

router.put('/',function(req,res){
	User.findById(req.body._id,function(err, user){
		if(err){
			res.status(404).send(err);
		}
		else {
			user.nombre = req.body.nombre;
			user.username = req.body.username;
			user.permission = req.body.permission;
			user.save(function(err, newpass){
				if (err) {
					throw err;
				}
				else {
					res.send({success: true, message: 'datos cambiados'});
				}
			});
			
		}
	});
});

router.put('/pass',function(req,res){
	User.findById(req.body._id,function(err, user){
		if(err){
			res.status(404).send(err);
		}
		else {
			user.password = req.body.password;
			user.save(function(err, newpass){
				if (err) {
					throw err;
				}
				else {
					res.json({success: true, message: 'contraseña cambiada'});
				}
			});
			
		}
	});
});

module.exports = router;
