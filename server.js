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
//mongodb://32-3a.mongo.evennode.com:27017,32-3b.mongo.evennode.com:27017/9c054367fba80df1044f23efc1c99cfe?replicaSet=us32-1
//mongodb://io:123456@ds053216.mlab.com:53216/global-les
var db = "mongodb://io:123456@ds053216.mlab.com:53216/global-les";
mongoose.connect(db, function(err, res){
	if(err){
		console.log('error al conectar a bd: '+ err);
	}
	else{
		console.log('conectado a BD');
	}
})

cloudinary.config({
	cloud_name: 'api-images',
	api_key: '869832633943739',
	api_secret: 'M-Mlnrr2f4mpuvTi77JvG--LRPc'
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

var port = process.env.PORT || 3000;
app.listen(port, function(){
	console.log('server en el puerto '+ port);
})