app.controller('RegVentaCtrl', function($http){
	var vm = this;
	vm.ventas = [];
	vm.productos = [];
	vm.productos2 = [];
	vm.empleados = [];
	vm.mostrarVentas;

	vm.MostrarVentas = function(){
		vm.mostrarVentas = true;
	};

	vm.getProductos = function(){
		$http.get('/inv/stock/').then(function(res){
			vm.productos = res.data;
			vm.productos2 = res.data;
		});
	};
	vm.getProductos();

	vm.getEmpleados = function(){
		$http.get('/inv/empleados').then(function(res){
			vm.empleados = res.data;
		});
	};
	vm.getEmpleados();

	vm.limpiar = function(){
		vm.venta = "";
	};
	//CRUD ventas
	vm.getVentas = function(){
		$http.get('/inv/reg_ventas').then(function(res){
			vm.ventas = res.data;
		});
	};

	vm.removeVenta = function(venta){
		if(venta){
			let findArray = function(array, a){
					var f = "";
					for (var i = array.length - 1; i >= 0; i--) {
						if(array[i].num == a){
							f = i;
							break;
						}
					}
					return f;
				}
			let f = findArray(venta.productos.num_serie, venta.num_serie)
			let productoN = venta.productos;
			productoN.num_serie[f].vendido = false;
			$http.delete('/inv/reg_ventas/'+ venta._id).then(function(res){
				vm.getVentas();
				$http.put('/inv/productos/', productoN).then(function(res){
					console.log('listo');
				});
			});		
		}
	}
	vm.getVentas();

	vm.addVenta = function(venta){
		if(venta && venta.nombres && venta.dni && venta.empleado){
			//vm.getNumSerie(venta.num_serie);
			//console.log(vm.getNumSerie(venta.num_serie));
			$http.get('/inv/stock/num_serie/'+ venta.num_serie).then(function(res){
				console.log(res.data[0]._id);
				venta.productos = res.data[0]._id;
				console.log(venta.productos);
				let findArray = function(array, a){
					var f = "";
					for (var i = array.length - 1; i >= 0; i--) {
						if(array[i].num == a){
							f = i;
							break;
						}
					}
					return f;
				}
				let f =findArray(res.data[0].num_serie, venta.num_serie);
				let productoN = res.data[0];
				productoN.num_serie[f].vendido = true;
				console.log(productoN);
				$http.post('/inv/reg_ventas', venta).then(function(res){
					vm.getVentas();
					$http.put('/inv/productos/', productoN).then(function(res){
						console.log('listo');
						vm.venta = "";
					});
				});
			});

			$http.get('/inv/stock/num_serie/'+ venta.num_imei).then(function(res){
				console.log(res.data[0]._id);
				venta.productos = res.data[0]._id;
				console.log(venta.productos);
				let findArray = function(array, a){
					var f = "";
					for (var i = array.length - 1; i >= 0; i--) {
						if(array[i].num == a){
							f = i;
							break;
						}
					}
					return f;
				}
				let f =findArray(res.data[0].num_serie, venta.num_serie);
				let productoN = res.data[0];
				productoN.num_serie[f].vendido = true;
				console.log(productoN);
				$http.post('/inv/reg_ventas', venta).then(function(res){
					vm.getVentas();
					$http.put('/inv/productos/', productoN).then(function(res){
						console.log('listo');
						vm.venta = "";
					});
				});
			});


			}
			else{
				console.log("faltan datos");
			}
	};
});