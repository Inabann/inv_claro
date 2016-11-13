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
	//$routeProvider.otherwhise('/');

});



app.controller('FacturaCtrl', function ($http) {
	var vm = this;
	vm.facturas = [];
	vm.getFacturas = function(){
		$http.get('/inv/facturas').then(function(res){
			vm.facturas = res.data;
		});
	}
	vm.getFacturas();
	
	vm.updateFactura = function(factura){
		if(factura){
			$http.put('/inv/facturas', factura).then(function(res){
				console.log('update user');
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
			});
		}
		else {
			console.log("faltan datos");
		}
	}
	
});
