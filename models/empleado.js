var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EmpleadoSchema = new Schema ({
	dni : String,
	nombre: String,
	activo: {type: Boolean, default: true}
});

var model = mongoose.model('Empleados', EmpleadoSchema);
module.exports = model;