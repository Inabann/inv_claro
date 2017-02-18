var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var precioSchema = new Schema({
	precio_v:Number,
	fecha: {
		type: Date,
		default: Date.now
	}
});	

var Producto_precioSchema = new Schema({
	codigo: {
		type: Number,
		required: true,
		unique: true	
	},
	descripcion: String,
	precio_var: [precioSchema]
	
});

var model = mongoose.model('producto_precio', Producto_precioSchema);
module.exports = model;