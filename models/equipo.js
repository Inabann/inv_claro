var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PrecioSchema = new Schema({
	modalidad: String,
	plan: String,
	precio: Number,
	fecha: Date
});

var EquipoSchema = new Schema({
	nombre: String,
	precio:[PrecioSchema]
});

var model = mongoose.model('Equipo', EquipoSchema);
module.exports = model;
