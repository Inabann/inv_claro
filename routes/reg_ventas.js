var empleadoModel = require('../models/empleado.js');
var productoModel = require('../models/producto.js');
var ventaModel = require('../models/reg_venta.js');
var mogoose = require('mongoose');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	ventaModel.find({}, function(err, ventas){
		if (err){
			res.status(404).send(err);
		}
		else {
			empleadoModel.populate(ventas, {path: "empleado"}, function(err, ventas){
				if(err){
					res.status(404).send(err);
				}
				else{
					productoModel.populate(ventas, {path: "productos"}, function(err, ventas){
						if(err){
							res.status(404).send(err);
						}
						else{
							res.status(200).send(ventas);
						}
					});
				};
			});
		};
	});
});

router.post('/', function(req, res){
	var model = new ventaModel();
	model.productos = req.body.productos;
	model.empleado = req.body.empleado;
	model.nombres = req.body.nombres;
	model.direccion = req.body.direccion;
	model.ref_dir = req.body.ref_dir;
	model.dni = req.body.dni;
	model.num_ref = req.body.num_ref;
	model.plan = req.body.plan;
	model.num = req.body.num;
	model.obs = req.body.obs;
	model.num_serie = req.body.num_serie;
	model.save(function(err, venta){
		if(err){
			res.status(500).send(err);
		}
		else{
			res.status(201).send(venta);
		}
	});
});

router.put('/', function(req, res){
	ventaModel.findByIdAndUpdate(req.body._id, {$set:req.body},{new:true}, function(err, venta){
		if(err){
			res.status(404).send(err);
		}
		else {
			empleadoModel.populate(venta, {path: "empleado"}, function(err, venta){
				if(err){
					res.status(404).send(err);
				}
				else{
					productoModel.populate(venta, {path: "productos"}, function(err, venta){
						if(err){
							res.status(404).send(err);
						}
						else{
							res.status(200).send(venta);
						}
					});
				};
			});
		}
	})
});

router.delete('/:id', function(req, res){
	var id = req.params.id;
	ventaModel.remove({_id: id}, function(err, response){
		if(err){
			res.status(500).send(err);
		}
		else{
			res.status(200).send({message: 'eliminacion completa'});
		}
	});
});

router.get('/:id', function(req, res){
    var id = req.params.id;
    console.log(id);
    ventaModel.find({'empleado':id}, function (err, ventas) {
        if (err) {
            res.send(err);
        } else {
        	productoModel.populate(ventas, {path: "productos"}, function(err, ventas){
				if(err){
					res.status(404).send(err);
				}
				else{
					res.status(200).send(ventas);
				}
			});
        }
    });
});

router.get('/mes/:id/:mes/:ano', function(req, res){
    var id = req.params.id;
    var mes = Number(req.params.mes);
    var año = Number(req.params.ano);
    var antmes = mes-1;
    var sigaño = año;
    if(antmes == 11){
    	mes = 0;
    	sigaño = año+1;
    }
    ventaModel.find({'empleado':id,fecha_venta: {$gte: new Date(año, antmes, 1), $lt: new Date(sigaño, mes, 1)}}, function (err, ventas) {
        if (err) {
            res.send(err);
        } else {
        	productoModel.populate(ventas, {path: "productos"}, function(err, ventas){
				if(err){
					res.status(404).send(err);
				}
				else{
					res.status(200).send(ventas);
				}
			});
        }
    });
});


module.exports = router;