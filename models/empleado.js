var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpleadoSchema = new Schema ({
	dni : String,
	nombre: String,
	apellido: String
	//ventas: [String]
});

var model = mongoose.model('Empleados', EmpleadoSchema);
module.exports = model;