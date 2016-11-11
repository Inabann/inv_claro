var Model = require('./models/factura.js')
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var app = express();

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: true}));


var db = "mongodb://io:123456@ds053216.mlab.com:53216/global-les";
mongoose.connect(db, function(err, res){
	if(err){
		console.log('error al conectar a '+db);
	}
	else{
		console.log('conectado a ' +db);
	}
})


app.use(morgan('dev'));
app.use(express.static(__dirname+'/public'));

var facturas = require('./routes/facturas');
app.use('/inv/facturas', facturas);

var productos = require('./routes/productos');
app.use('/inv/productos', productos);

app.listen(3000, function(){
	console.log('server en el puerto 3000');
})