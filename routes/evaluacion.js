var evaluacionModel = require('../models/evaluacion.js');
var mogoose = require('mongoose');	
var express = require('express');
var router = express.Router();

//mostar todas los empleados
router.get('/',function(req,res){
	evaluacionModel.find({},function(err, evaluacion){
		res.status(200).send(evaluacion);
	})
});

//agregar
router.post('/', function(req,res){
	var model = new evaluacionModel();
	model.nombre = req.body.nombre;
	model.dni = req.body.dni;
	model.correo = req.body.correo;
	model.celular = req.body.celular;
	model.plan = req.body.plan;
	model.equipo = req.body.equipo;

	model.save(function(err, evaluacion){
		if(err){
			res.status(500).send(err);
		}
		else{
			res.send(evaluacion);
		}
	});
});

module.exports = router;