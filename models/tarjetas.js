var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TarjetaSchema = new Schema ({
	titulo : String,
	descripcion: String,
	url: String,
	categoria: String,
	public_id: String
});

var model = mongoose.model('Tarjetas', TarjetaSchema);
module.exports = model;