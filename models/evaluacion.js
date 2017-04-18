var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Productos = require('./producto').model;

var EvaluacionSchema = new Schema ({
	nombre: String,
	dni : String,
	correo: String,
	celular: Number,
	plan: String,
	modalidad: String,
	operadora: String,
	equipo: String,
	revisado: {type: Boolean, default: false}
	
});

var model = mongoose.model('Evaluacion', EvaluacionSchema);
module.exports = model;