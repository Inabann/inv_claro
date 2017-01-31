var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Productos = require('./producto').model;
var Empleados = require('./empleado').model;
var RegVentaSchema = new Schema({
	productos: {type: Schema.ObjectId, ref: "Productos" },
	productos2: {type: Schema.ObjectId, ref: "Productos" },
	num_serie: Number,
	num_imei: Number,
	empleado: {type: Schema.ObjectId, ref: "Empleados"},
	fecha_venta: {type: Date, default: Date.now},
	nombres: String,
	direccion: String,
	ref_dir: String,
	dni: String,
	num_ref: String,
	plan: String,
	num: Number,
	obs: String
});

var model = mongoose.model('RegVenta', RegVentaSchema);
module.exports = model;