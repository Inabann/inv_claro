var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var pro = require('./producto');
var Productos = pro.model;
var guia = require('./guia');
var Guia = guia.model;

var FacturaSchema = new Schema({
	serie:
	{
		type: String,
		required: true,
		unique: true	
		/*validate: [function(seriefact){
			return (seriefact.length<=4 && seriefact.length>3);
		},'dato incorrecto']*/
	},
	num_fact:
	{
		type: String,
		required: true,
		unique: true	
		/*validate: [function(numfact){
			return (numfact.length<=8 && numfact.length>7);
		},'dato incorrecto']*/
	},
	fecha: Date,
	productos: [{ type: Schema.ObjectId, ref: "Productos" }] ,
	sub_total: Number,
	igv: Number,
	total: Number,
	guia: { type: Schema.ObjectId, ref: "Guia" },
	tipo: String
});

var model = mongoose.model('Facturas', FacturaSchema);
module.exports = model;
