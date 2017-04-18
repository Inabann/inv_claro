var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var path = require('path');
var cloudinary = require('cloudinary');
var multiPart = require('connect-multiparty');
var multiPartyMiddleware = multiPart();

var app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(multiPartyMiddleware);

var db = "mongodb://63a05c4a6cf135a523ccdd89754ed244:globalles@32-3a.mongo.evennode.com:27017/63a05c4a6cf135a523ccdd89754ed244";
//var db = "mongodb://io:123456@ds053216.mlab.com:53216/global-les";
mongoose.connect(db, function(err, res){
	if(err){
		console.log('error al conectar a bd: '+ err);
	}
	else{
		console.log('conectado a BD');
	}
})

cloudinary.config({
	cloud_name: 'dvgrmqhdf',
	api_key: '164834886648217',
	api_secret: 'FpKbkK9ApTnmpLr8IXqWDf4vbrY'
});

app.use(express.static(__dirname+'/public'));

var users = require('./routes/users');
app.use('/inv/users', users);

var facturas = require('./routes/facturas');
app.use('/inv/facturas', facturas);

var productos = require('./routes/productos');
app.use('/inv/productos', productos);

var stock = require('./routes/stock');
app.use('/inv/stock', stock);

var empleados = require('./routes/empleados');
app.use('/inv/empleados', empleados);

var reg_ventas = require('./routes/reg_ventas');
app.use('/inv/reg_ventas', reg_ventas);

var producto_precio = require('./routes/producto_precio');
app.use('/inv/producto_precio', producto_precio);

var evaluacion = require('./routes/evaluacion');
app.use('/inv/evaluacion', evaluacion);

var tarjetas = require('./routes/tarjetas');
app.use('/inv/tarjetas', tarjetas);

var equipos = require('./routes/equipos');
app.use('/inv/equipos', equipos);

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('server en el puerto '+ port);
})