var productoModel = require('../models/producto.js');
var mogoose = require('mongoose');
var express = require('express');
var router = express.Router();

router.get('/',function(req,res){
	productoModel.aggregate([
        {
            $group: {
                _id: '$codigo',
                nombre: {$first: '$descripcion'},
                cantidad_res: {$sum: '$no_vendido'},
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

module.exports = router;