var productoModel = require('../models/producto.js');
var facturaModel = require('../models/factura.js');
var mogoose = require('mongoose');
var express = require('express');
var router = express.Router();

//mostar todas los productos
router.get('/',function(req,res){
	productoModel.find({},function(err, productos){
		res.status(200).send(productos);
	})
});


router.get('/:id',function(req, res){
	var id = req.params.id;
	//console.log(id);
	facturaModel.findById(id, function(err, factura){
		if(err){
			res.status(404).send(err);
		}
		else {
			
			productoModel.populate(factura, {path: "productos"}, function(err, factura){
				res.status(200).send(factura);
		});
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
	model.no_vendido = req.body.cantidad;
	model.save(function(err, producto){
		if(err){
			res.status(500).send(err);
		}
		else{
			res.send(producto);
		}
	});
});

//editar factura
router.put('/',function(req,res){
	productoModel.findByIdAndUpdate(req.body._id,{$set:req.body},{new:true},function(err, producto){
		if(err){
			res.status(404).send(err);
		}
		else {
			res.status(200).send(producto);
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