var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var numSchema = new Schema({
	num: Number,
	vendido: {
		type: Boolean,
		default: false
	}
},{_id:false});

var ProductoSchema = new Schema({
	codigo: Number,
	descripcion: String,
	num_serie:[numSchema],
	num_imei:[numSchema],
	cantidad: Number,
	precio_u: Number,
	valor_u: Number,
	total: Number
});

var model = mongoose.model('Productos', ProductoSchema);
module.exports = model;
