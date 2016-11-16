var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pro = require('./producto');
var Productos = pro.model;
var guia = require('./guia');
var Guia = guia.model;
//var Productos = require('mongoose').model('Productos').schema;

var FacturaSchema = new Schema({
	serie: String,
	num_fact: String,
	fecha: Date,
	productos: [{ type: Schema.ObjectId, ref: "Productos" }] ,
	sub_total: Number,
	igv: Number,
	total: Number,
	guia: { type: Schema.ObjectId, ref: "Guia" }

	//guia: populate, falta agregar guia de remision
});

var model = mongoose.model('Facturas', FacturaSchema);
module.exports = model;