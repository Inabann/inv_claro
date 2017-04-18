var productoModel = require('../models/producto.js');
var mogoose = require('mongoose');
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	productoModel.aggregate([
        {
            $unwind: '$num_serie'
        },
        {
            $match: { 'num_serie.vendido' : {$eq: false}}
        },
        {
            $group: {
                _id: '$codigo',
                nombre: {$first: '$descripcion'},
                cantidad_res: {$sum: 1},
            }
        },
        {
            $sort: {
                cantidad_res: -1
            }
        }

    ], function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

router.get('/num_serie/:id', function(req, res){
    var serie = req.params.id;
    productoModel.find({'num_serie.num':serie}, function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.send(result);
        }
    });
});

module.exports = router;