var facturaModel = require('../models/factura.js');
var productoModel = require('../models/producto.js');
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
			productoModel.populate(facturas, {path: "productos"}, function(err, facturas){
				res.status(200).send(facturas);
			});
			
		};
	});
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
	facturaModel.findByIdAndUpdate(req.body._id, {$set:req.body},{new:true}, function(err, factura){
		if(err){
			response.status(404).send(err);
		}
		else {
			productoModel.populate(factura, {path: "productos"}, function(err, factura){
				res.status(200).send(factura);
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