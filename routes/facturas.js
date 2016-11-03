var facturaModel = require('../models/factura.js');
var mogoose = require('mongoose');
var express = require('express');
var router = express.Router();

//mostar todas las facturas
router.get('/',function(req, res){
	facturaModel.find({}, function(err, facturas){
		if(err){
			res.status(404).send(err);
		}
		else {
			res.status(200).send(facturas)
		}
	})
});

//agregar
router.post('/', function(req,res){
	var model = new facturaModel();
	model.serie = req.body.serie;
	model.num_fact = req.body.num_fact;
	model.fecha = req.body.fecha;
	model.sub_total = req.body.sub_total;
	model.igv = req.body.igv;
	model.total = req.body.total;
	model.save(function(err, factura){
		if(err){
			res.status(500).send(err);
		}
		else{
			res.status(201).send(factura);
		}
	});
});

//editar factura
router.put('/',function(req,res){
	facturaModel.findById(req.body._id, function(err, factura){
		if(err){
			response.status(404).send(err);
		}
		else {
			factura.update(req.body, function(err, success){
				if(err){
					res.send(err);
				}
				else{
					res.status(200).send({message: 'success'});
				}
			});
		}
	})
});

//eliminar
router.delete('/:id',function(req,res){
	var id = req.params.id;
	facturaModel.remove({_id: id}, function(err,response){
		if(err){
			res.status(500).send(err);
		}
		else {
			res.status(200).send({message: 'eliminacion completa'});
		}
	})
});

module.exports = router;