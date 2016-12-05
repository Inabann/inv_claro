var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VendedorSchema = new Schema ({
	dni : String,
	nombre: String,
	apellido: String,
	ventas: [String]
});