app.controller('FacturaCtrl', function ($http, User) {
	var vm = this;
	vm.facturas = [];
	vm.accessDenied = true;
	vm.editAccess = false;
	vm.deleteAccess = false;
	vm.errorMsg = false;
	vm.detalleFactura;

	User.getUsers().then(function(data) {
	    if (data.data.success) {
	        if (data.data.permission === 'admin' || data.data.permission === 'moderador') {
	            vm.loading = false;
	            vm.accessDenied = false;
	            if (data.data.permission === 'admin') {
	                vm.editAccess = true;
	                vm.deleteAccess = true;
	            } else if (data.data.permission === 'moderador') {
	                vm.editAccess = true;
	            }
	        } else {
	            vm.errorMsg = 'Permiso Insuficiente';
	        }
	    } else {
	        vm.errorMsg = data.data.message;
	    }
	});


	vm.limpiar = function(factura){
		vm.factura = "";
	};
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

	vm.showNum = function(producto){
		vm.detalleProducto = producto;
	}

	vm.productos = [];

	vm.getProductos = function(){
		$http.get('/inv/productos').then(function(res){
			vm.productos = res.data;
		});
	}
	vm.getProductos();



	vm.addSerie = function(num_serie, ultimo){
		//&& (typeof ultimo === 'number')
		if ((typeof num_serie === 'number')){
			if(!ultimo){
				vm.detalleProducto.num_serie.push({num : num_serie});	
				$http.put('/inv/productos', vm.detalleProducto).then(function(res){
					//vm.detalleProducto = res.data;
				});
				vm.getProductos();
			} else if (num_serie && ultimo){
				if(typeof ultimo === 'number'){
					if(ultimo > num_serie){
						for (var i = num_serie; i <= ultimo; i++) {
						   vm.detalleProducto.num_serie.push({num: i});
						}
						$http.put('/inv/productos', vm.detalleProducto);
					}
				} 
			}
		}
		else{
			console.log("ingrese un numero");
		}
	}

	vm.removeSerie = function(num_serie){
		Array.prototype.removeValue = function(name, value){
		   var array = $.map(this, function(v,i){
		      return v[name] === value ? null : v;
		   });
		   this.length = 0;
		   this.push.apply(this, array);
		};
		vm.detalleProducto.num_serie.removeValue("num", num_serie.num);
		$http.put('/inv/productos', vm.detalleProducto).then(function(res){			
		});
	}
	
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
        var productoPrecio ={
        	codigo: producto.codigo,
        	descripcion: producto.descripcion
        	
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
				total : vm.detalleFactura.total,
				tipo :  vm.detalleFactura.tipo
        	}
        	
        	$http.put('/inv/facturas', facturaJSON).then(function(res){
        		console.log('producto agregado a la factura');
        		//console.log(res.data);
        		vm.detalleFactura = res.data;

        		$http.post('/inv/producto_precio', productoPrecio).then(function(res) {
        		console.log('guardo producto_precio');
        		})

        	})
        	productoJSON= "";
        	facturaJSON= "";
        	vm.getFacturas();
        });
    } else {
        console.log("faltan datos");
    }
	}
	
	

	vm.removeProducto = function(producto){
		if(producto){
			$http.delete('/inv/productos/'+ producto._id).then(function(res){
				//console.log("producto eliminado")
			});
			vm.getFacturas();
			$http.get('/inv/productos/'+vm.detalleFactura._id).then(function(res){
				vm.detalleFactura = res.data;
			});
		}
	}

	vm.updateProducto = function(producto){
		if(producto){
			$http.put('/inv/productos', producto).then(function(res){

			});
			$http.get('/inv/productos/'+vm.detalleFactura._id).then(function(res){
				vm.detalleFactura = res.data;
			});
		}
	}
	
	vm.updateFactura = function(factura){
		if(factura){
			$http.put('/inv/facturas', factura).then(function(res){
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