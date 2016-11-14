var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GuiaSchema = new Schema({
	serie: String,
	num_fact: String
	
	
});

var model = mongoose.model('Guia', GuiaSchema);
module.exports = model;