var equipoModel = require('../models/equipo.js');
var mogoose = require('mongoose');
var express = require('express');
var router = express.Router();

//mostar todas los equipos
router.get('/',function(req, res){
	equipoModel.find({}, function(err, equipo){
		if(err){
			res.status(404).send(err);
		}
		else {
			res.status(200).send(equipo);
		}
	});
});

//agregar
router.post('/', function(req,res){
	var model = new equipoModel();
	model.nombre = req.body.nombre;
	model.save(function(err, equipo){
		if(err){
			res.status(500).send(err);
		}
		else{
			res.status(200).send(equipo);
		}
	});
});

router.put('/',function(req,res){
	equipoModel.findByIdAndUpdate(req.body._id, {$set:req.body},{new:true}, function(err, equipo){
		if(err){
			response.status(404).send(err);
		}
		else {
			res.status(200).send(equipo);
		}
	})
});

router.put('/precio',function(req,res){
	equipoModel.findByIdAndUpdate(req.body._id,{$set:req.body},{new:true},function(err, equipo){
		if(err){
			res.status(404).send(err);
		}
		else {
			res.status(200).send(equipo);
		}
	})
});

//eliminar
router.delete('/:id',function(req,res){
	var id = req.params.id;
	equipoModel.remove({_id: id}, function(err,response){
		if(err){
			res.status(500).send(err);
		}
		else {
			res.status(200).send({message: 'eliminacion completa'});
		}
	})
});

module.exports = router;