var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EvaluacionSchema = new Schema ({
	nombre: String,
	dni : String,
	correo: String,
	celular: Number,
	plan: String,
	equipo: String,
	revisado:  {type: Boolean, default: false}
	
});

var model = mongoose.model('Evaluacion', EvaluacionSchema);
module.exports = model;