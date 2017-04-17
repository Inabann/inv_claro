var productoModel = require('../models/producto_precio.js');
var mogoose = require('mongoose');
var express = require('express');
var router = express.Router();

router.put('/precio_var',function(req,res){
	productoModel.findByIdAndUpdate(req.body._id,{$set:req.body},{new:true},function(err, precio_var){
		if(err){
			res.status(404).send(err);
		}
		else {
			res.status(200).send(precio_var);
		}
	})
});

router.get('/',function(req,res){
	productoModel.find({},function(err, productos){
		res.status(200).send(productos);
	})
});

//agregar
router.post('/', function(req,res){
	var model = new productoModel();
	model.codigo = req.body.codigo;
	model.descripcion = req.body.descripcion;
	model.save(function(err, producto){
		if(err){
			res.status(500).send(err);
		}
		else{
			res.send(producto);
		}
	});
});

module.exports = router;