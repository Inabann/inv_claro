app.controller('EmpleadoCtrl', function ($http) {
	var vm = this;
	vm.empleados = [];
	vm.detalle;
	vm.ventas = [];

	vm.mesVentas = function(fecha){
		$http.get('/inv/reg_ventas/mes/'+vm.detalle._id+'/'+fecha.mes+'/'+fecha.ano).then(function(res){
			vm.ventas = res.data
		});
		console.log(fecha);
	};
	vm.detalleVentas = function(empleado){
		vm.detalle = empleado;
		$http.get('/inv/reg_ventas/'+vm.detalle._id).then(function(res){
			vm.ventas = res.data;
		});
	};

	vm.getEmpleados = function(){
		$http.get('/inv/empleados').then(function(res){
			vm.empleados = res.data;
		});
	};
	vm.getEmpleados();
	
	vm.updateEmpleado = function(empleado){
		if(empleado){
			$http.put('/inv/empleados', empleado).then(function(res){
				console.log('update empleado');
				vm.getEmpleados();
			})
		}
	}
	
	vm.removeEmpleado = function(empleado){
		if(empleado){
			empleado.activo = false;
			$http.put('/inv/empleados', empleado).then(function(res){
				console.log('update empleado');
				vm.getEmpleados();
			})
		}
	}
	
	vm.addEmpleado = function(empleado){
		if(empleado && empleado.dni){
			console.log("empleado creado");
			
			$http.post('/inv/empleados', empleado).then(function(res){
				vm.getEmpleados();
				vm.empleados="";
				vm.empleado = "";
			});
		}
		else {
			console.log("faltan datos");
		}
	}
});