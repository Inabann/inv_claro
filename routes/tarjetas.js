var tarjetaModel = require('../models/tarjetas.js');
var mogoose = require('mongoose');	
var express = require('express');
var router = express.Router();
var multiPart = require('connect-multiparty');
var multiPartyMiddleware = multiPart();
var cloudinary = require('cloudinary');

router.get('/',function(req,res){
	tarjetaModel.find({},function(err, tarjetas){
		res.status(200).send(tarjetas);
	})
});

router.post('/', multiPartyMiddleware, function(req, res){
	cloudinary.uploader.upload(req.files.file.path, function(result){
		console.log(result);
		var model = new tarjetaModel();
		model.titulo = req.body.datos.titulo;
		model.descripcion = req.body.datos.descripcion;
		model.categoria = req.body.datos.categoria;
		model.url = result.secure_url;
		model.public_id = result.public_id;
		model.save(function(err, tarjeta){
			if(err){
				res.status(500).send(err);
			}
			else{
				res.send(tarjeta);
			}
		});
	});
	//req.body.datos
	//req.files.file.path
});

router.delete('/:id/:p_id',function(req,res){
	var id = req.params.id;
	var p_id= req.params.p_id;
	tarjetaModel.remove({_id: id}, function(err,response){
		if(err){
			res.status(500).send(err);
		}
		else {
			res.status(200).send({message: 'eliminacion completa'});
			console.log('listo');
			cloudinary.uploader.destroy(p_id, function(result) { console.log(result) });
		}
	})
});

module.exports = router;