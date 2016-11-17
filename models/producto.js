var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductoSchema = new Schema({
	codigo:
	{
		type: String,
		required: true,
		unique: true,	
		validate: [function(seriefact){return (seriefact.length<=18 && seriefact.length>6);},'dato incorrecto']
	},
	descripcion: String,
	num_serie:[String],
	cantidad: Number,
	precio_u: Number,
	valor_u: Number,
	total: Number
	
});

var model = mongoose.model('Productos', ProductoSchema);
module.exports = model;
