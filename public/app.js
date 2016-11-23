var app = angular.module('app', ['ngRoute']);



app.config(function ($routeProvider) {
	$routeProvider.when('/facturas', {
		controller: 'FacturaCtrl',
		controllerAs: 'vm',
		templateUrl: 'facturas.html'
	});
	$routeProvider.when('/productos',{
		controller: 'ProductoCtrl',
		controllerAs: 'vm',
		templateUrl: 'productos.html'
		
	});
	$routeProvider.when('/logins',{
		controller: 'loginCtrl',
		controllerAs: 'vm',		
		templateUrl: 'login.html'
	});
	});
	//$routeProvider.otherwhise('/');


app.controller('FacturaCtrl', function ($http) {
	var vm = this;
	vm.facturas = [];

	vm.detalleFactura;

	vm.showDetalles = function(factura){
		vm.detalleFactura = factura;
		vm.detalle = true;

	}
	
	vm.getFacturas = function(){
		$http.get('/inv/facturas').then(function(res){
			vm.facturas = res.data;
		});
	}
	vm.getFacturas();

	vm.addProducto = function(producto) {
    if (producto && producto.codigo) {
        var productoJSON ={
        	codigo: producto.codigo,
        	descripcion: producto.descripcion,
        	cantidad: producto.cantidad,
        	precio_u: producto.precio_u,
        	valor_u: producto.valor_u,
        	total: producto.total
        };

        $http.post('/inv/productos', productoJSON).then(function(res) {
        	vm.detalleFactura.productos.push(res.data._id);
        	var facturaJSON = {
        		_id : vm.detalleFactura._id,
        		serie : vm.detalleFactura.serie,
				num_fact : vm.detalleFactura.num_fact,
				fecha : vm.detalleFactura.fecha,
				productos: vm.detalleFactura.productos,
				sub_total : vm.detalleFactura.sub_total,
				igv : vm.detalleFactura.igv,
				total : vm.detalleFactura.total
        	}

        	$http.put('/inv/facturas', facturaJSON).then(function(res){
        		console.log('producto agregado a la factura');
        		console.log(res.data);
        		vm.detalleFactura = res.data;

        	})
        	productoJSON= "";
        	facturaJSON= "";
        	
        });
    } else {
        console.log("faltan datos");
    }
	}


	
	
	vm.updateFactura = function(factura){
		if(factura){
			$http.put('/inv/facturas', factura).then(function(res){
				console.log('update factura');
				vm.getFacturas();
			})
		}
	}
	
	vm.removeFactura = function(factura){
		if(factura){
			$http.delete('/inv/facturas/'+ factura._id).then(function(res){
				vm.getFacturas();
			});
		}
	}
	
	vm.addFactura = function(factura){
		if(factura && factura.serie && factura.num_fact){
			console.log("crear factura");
			
			$http.post('/inv/facturas', factura).then(function(res){
				vm.getFacturas();
				vm.facturas="";
				vm.addfactura = false;
			});
		}
		else {
			console.log("faltan datos");
		}
	}
});

//controller productos
app.controller('ProductoCtrl', function ($http) {
	var vm = this;
	vm.productos = [];
	vm.getProductos = function(){
		$http.get('/inv/productos').then(function(res){
			vm.productos = res.data;
		});
	}
	vm.getProductos();
	
	vm.updateProducto = function(producto){
		if(producto){
			$http.put('/inv/productos', producto).then(function(res){
				console.log('update producto');
				vm.getProductos();
			})
		}
	}
	
	vm.removeProducto = function(producto){
		if(producto){
			$http.delete('/inv/productos/'+ producto._id).then(function(res){
				vm.getProductos();
			});
		}
	}
	
	vm.addProducto = function(producto){
		if(producto && producto.codigo){
			console.log("producto creado");
			
			$http.post('/inv/productos', producto).then(function(res){
				vm.getProductos();
				vm.productos="";
				vm.addproducto = false;
				console.log("prueba:"+res.data._id);
			});
		}
		else {
			console.log("faltan datos");
		}
	}
	
});
//controller login
app.controller('loginCtrl',function($scope,$location){
	scope.submit = function(){
		var uname = $scope.username;
		var password = $scope.password;
		if($scope.username == 'marco' && $scope.password == '123456'){
			$location.path('/dashboard');
		}
		else{
			alert('nombre o password incorrecto');
		}
	};
});