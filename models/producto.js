var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductoSchema = new Schema({
	codigo: String,
	descripcion: String,
	num_serie:[String],
	cantidad: Number,
	precio_u: Number,
	valor_u: Number,
	total: Number
	
});

var model = mongoose.model('Productos', ProductoSchema);
module.exports = model;