var evaluacionModel = require('../models/evaluacion.js');
var productoModel = require('../models/producto.js');
var mogoose = require('mongoose');	
var express = require('express');
var router = express.Router();

//mostar todas los empleados
router.get('/',function(req,res){
	evaluacionModel.find({},function(err, evaluacion){
	if (err){
		res.status(404).send(err);
	}
	else{
		productoModel.populate(evaluacion, {path: "equipo"}, function(err, evaluacion){
			if(err){
				res.status(404).send(err);
			}
			else{
				res.status(200).send(evaluacion);
			}
		});
	}
	})
});
//actualizar estado de revision

router.put('/',function(req,res){
	console.log('estado');
	evaluacionModel.findByIdAndUpdate(req.body._id,{$set:req.body},{new:true},function(err, revisado){
		if(err){
			res.status(404).send(err);
		}
		else {
			res.status(200).send(revisado);
		}
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

//eliminar
router.delete('/:id',function(req,res){
	var id = req.params.id;
	evaluacionModel.remove({_id: id}, function(err,response){
		if(err){
			res.status(500).send(err);
		}
		else {
			res.status(200).send({message: 'eliminacion completa'});
		}
	})
});

module.exports = router;