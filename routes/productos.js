var productoModel = require('../models/producto.js');
var facturaModel = require('../models/factura.js');
var mogoose = require('mongoose');
var express = require('express');
var router = express.Router();

router.put('/num_serie',function(req,res){
	productoModel.update({_id: req.body._id, 'num_serie.num':req.body.num_serie},{$set:{'num_serie.$.vendido': true}},function(err, num_serie){
		if(err){
			res.status(404).send(err);
		}
		else {
			res.status(200).send(num_serie);
		}
	})
});

router.put('/num_imei',function(req,res){
	productoModel.update({_id: req.body._id, 'num_imei.num':req.body.num_imei},{$set:{'num_imei.$.vendido': true}},function(err, num_imei){
		if(err){
			res.status(404).send(err);
		}
		else {
			res.status(200).send(num_imei);
		}
	})
});



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