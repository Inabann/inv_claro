var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FacturaSchema = new Schema({
	serie: String,
	num_fact: String,
	fecha: Date,
	sub_total: Number,
	igv: Number,
	total: Number
	//productos: populate, falta agregar productos
	//guia: populate, falta agregar guia de remision
});

var model = mongoose.model('Facturas', FacturaSchema);
module.exports = model;