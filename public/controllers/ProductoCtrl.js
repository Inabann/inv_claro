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