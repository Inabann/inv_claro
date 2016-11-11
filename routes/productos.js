var productoModel = require('../models/producto.js');
var mogoose = require('mongoose');
var express = require('express');
var router = express.Router();

//mostar todas los productos
router.get('/',function(req, res){
	productoModel.find({}, function(err, productos){
		if(err){
			res.status(404).send(err);
		}
		else {
			res.status(200).send(productos)
		}
	})
});

//agregar
router.post('/', function(req,res){
	var model = new productoModel();
	model.codigo = req.body.codigo;
	model.descripcion = req.body.descripcion;
	model.cantidad = req.body.cantidad;
	model.precio_u = req.body.precio_u;
	model.valor_u = req.body.valor_u;
	model.total = req.body.total;

	model.save(function(err, producto){
		if(err){
			res.status(500).send(err);
		}
		else{
			res.status(201).send(producto);
		}
	});
});

//editar factura
router.put('/',function(req,res){
	productoModel.findById(req.body._id, function(err, producto){
		if(err){
			response.status(404).send(err);
		}
		else {
			producto.update(req.body, function(err, success){
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
	productoModel.remove({_id: id}, function(err,response){
		if(err){
			res.status(500).send(err);
		}
		else {
			res.status(200).send({message: 'eliminacion completa'});
		}
	})
});

module.exports = router;