app.controller('ProductoCtrl', function ($http) {
	var vm = this;
	vm.productos = [];
	vm.producto_precio=[];

	vm.getProductos = function(){
		$http.get('/inv/productos').then(function(res){
			vm.productos = res.data;
		});
	}
	vm.getProductos();

	//producto precio obtener lista
	vm.getProductoPrecio = function(){
		$http.get('/inv/producto_precio').then(function(res){
			vm.producto_precio = res.data;
		});
	};
	vm.getProductoPrecio();

	vm.showPrecios = function(producto){
		vm.preciosProducto = producto;
	}

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

	vm.addPrecioP = function(precio_var,fecha_precio){
		if (typeof precio_var === 'number'){
			vm.preciosProducto.precio_var.push({precio_v : precio_var,fecha:fecha_precio});
			console.log(vm.preciosProducto);
			$http.put('/inv/producto_precio/precio_var', vm.preciosProducto).then(function(res){
				console.log(res.data);
				//vm.detalleProducto = res.data;
			});

			vm.getProductoPrecio();
		}
		else{
			console.log("ingrese un numero");
		}
		vm.precio_var="";
		vm.fecha_precio="";
	}
	vm.removePrecioP = function(precio_var){
		console.log(precio_var);
		Array.prototype.removeValue = function(name, value){
		   var array = $.map(this, function(v,i){
		      return v[name] === value ? null : v;
		   });
		   this.length = 0;
		   this.push.apply(this, array);
		};
		vm.preciosProducto.precio_var.removeValue("_id", precio_var._id);
		console.log(vm.preciosProducto.precio_var);
		$http.put('/inv/producto_precio/precio_var', vm.preciosProducto).then(function(res){
			console.log(res.data);
		});
	}
	
});