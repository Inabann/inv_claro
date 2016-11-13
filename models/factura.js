var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pro = require('./producto');
var Productos = pro.model;

var FacturaSchema = new Schema({
	serie: String,
	num_fact: String,
	fecha: Date,
	productos: [{ type: Schema.ObjectId, ref: "Productos" }] ,
	sub_total: Number,
	igv: Number,
	total: Number

	//guia: populate, falta agregar guia de remision
});

var model = mongoose.model('Facturas', FacturaSchema);
module.exports = model;