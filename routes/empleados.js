var empleadoModel = require('../models/empleado.js');
var mogoose = require('mongoose');
var express = require('express');
var router = express.Router();

//mostar todas los empleados
router.get('/',function(req,res){
	empleadoModel.find({activo:true},function(err, empleados){
		res.status(200).send(empleados);
	})
});

//agregar
router.post('/', function(req,res){
	var model = new empleadoModel();
	model.dni = req.body.dni;
	model.nombre = req.body.nombre;
	model.save(function(err, empleado){
		if(err){
			res.status(500).send(err);
		}
		else{
			res.send(empleado);
		}
	});
});

//editar factura
router.put('/',function(req,res){
	empleadoModel.findByIdAndUpdate(req.body._id,{$set:req.body},{new:true},function(err, empleado){
		if(err){
			res.status(404).send(err);
		}
		else {
			res.status(200).send(empleado);
		}
	})
});

//eliminar
router.delete('/:id',function(req,res){
	var id = req.params.id;
	empleadoModel.remove({_id: id}, function(err,response){
		if(err){
			res.status(500).send(err);
		}
		else {
			res.status(200).send({message: 'eliminacion completa'});
		}
	})
});

module.exports = router;