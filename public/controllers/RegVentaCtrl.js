app.controller('RegVentaCtrl', function($http){
	var vm = this;
	vm.ventas = [];
	vm.productos = [];
	vm.empleados = [];
	vm.mostrarVentas;

	vm.MostrarVentas = function(){
		vm.mostrarVentas = true;
	};

	vm.getProductos = function(){
		$http.get('/inv/stock/').then(function(res){
			vm.productos = res.data;
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
	vm.getVentas();

	vm.removeVenta = function(venta){
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
		if(venta.num_serie && venta.num_imei){
			$http.get('/inv/stock/num_serie/'+ venta.num_serie).then(function(res){
				let f =findArray(res.data[0].num_serie, venta.num_serie);
				let productoN1 = res.data[0];
				productoN1.num_serie[f].vendido = false;
				$http.get('/inv/stock/num_serie/'+ venta.num_imei).then(function(res){
					let f =findArray(res.data[0].num_serie, venta.num_imei);
					let productoN2 = res.data[0];
					productoN2.num_serie[f].vendido = false;
					$http.put('/inv/productos/', productoN2).then(function(res){
						console.log('imei cambiado a false');
						$http.put('/inv/productos/', productoN1).then(function(res){
							console.log('iccid cambiado a false');
							$http.delete('/inv/reg_ventas/'+ venta._id).then(function(res){
								vm.getVentas();
							});
						});
					});
				});
			});
		}else if(venta.num_serie && !venta.num_imei){
			$http.get('/inv/stock/num_serie/'+ venta.num_serie).then(function(res){
				let f =findArray(res.data[0].num_serie, venta.num_serie);
				let productoN1 = res.data[0];
				productoN1.num_serie[f].vendido = false;
				$http.put('/inv/productos/', productoN1).then(function(res){
					console.log('listo');
					$http.delete('/inv/reg_ventas/'+ venta._id).then(function(res){
						vm.getVentas();
					});
				});
			});
		}else if(!venta.num_serie && venta.num_imei){
			$http.get('/inv/stock/num_serie/'+ venta.num_imei).then(function(res){
				let f =findArray(res.data[0].num_serie, venta.num_imei);
				let productoN2 = res.data[0];
				productoN2.num_serie[f].vendido = false;
				$http.put('/inv/productos/', productoN2).then(function(res){
					console.log('listo');
					$http.delete('/inv/reg_ventas/'+ venta._id).then(function(res){
						vm.getVentas();
					});
				});
			});
		}
	}
	

	vm.addVenta = function(venta){
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
		if(venta.num_serie && venta.num_imei){
			$http.get('/inv/stock/num_serie/'+ venta.num_serie).then(function(res){
				venta.producto1= res.data[0]._id;
				let f =findArray(res.data[0].num_serie, venta.num_serie);
				let productoN1 = res.data[0];
				productoN1.num_serie[f].vendido = true;
				$http.get('/inv/stock/num_serie/'+ venta.num_imei).then(function(res){
					venta.producto2 = res.data[0]._id;
					let f =findArray(res.data[0].num_serie, venta.num_imei);
					let productoN2 = res.data[0];
					productoN2.num_serie[f].vendido = true;
					$http.post('/inv/reg_ventas', venta).then(function(res){
						vm.getVentas();
						vm.venta = "";
						$http.put('/inv/productos/', productoN2).then(function(res){
							console.log('listo imei');
							$http.put('/inv/productos/', productoN1).then(function(res){
								console.log('listo iccid');
							});
						});
					});
				});
			});

		}else if(venta.num_serie && !venta.num_imei){
			$http.get('/inv/stock/num_serie/'+ venta.num_serie).then(function(res){
				venta.producto1 = res.data[0]._id;
				let f =findArray(res.data[0].num_serie, venta.num_serie);
				let productoN1 = res.data[0];
				productoN1.num_serie[f].vendido = true;
				$http.put('/inv/productos/', productoN1).then(function(res){
					console.log('listo num_serie');
					$http.post('/inv/reg_ventas', venta).then(function(res){
						vm.getVentas();
						vm.venta = "";
					});
				});
			});
		}else if(!venta.num_serie && venta.num_imei){
			$http.get('/inv/stock/num_serie/'+ venta.num_imei).then(function(res){
				venta.producto2 = res.data[0]._id;
				let f =findArray(res.data[0].num_serie, venta.num_imei);
				let productoN2 = res.data[0];
				productoN2.num_serie[f].vendido = true;
				$http.put('/inv/productos/', productoN2).then(function(res){
					console.log('listo imei');
					$http.post('/inv/reg_ventas', venta).then(function(res){
						vm.getVentas();
						vm.venta = "";
					});
				});
			});
		}else{
			console.log("faltan datos");
		}
	};
});