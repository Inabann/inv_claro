app.controller('EmpleadoCtrl', function ($http) {
	var vm = this;
	vm.empleados = [];
	vm.getEmpleados = function(){
		$http.get('/inv/empleados').then(function(res){
			vm.empleados = res.data;
		});
	}
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
			$http.delete('/inv/empleados/'+ empleado._id).then(function(res){
				vm.getEmpleados();
			});
		}
	}
	
	vm.addEmpleado = function(empleado){
		if(empleado && empleado.dni){
			console.log("empleado creado");
			
			$http.post('/inv/empleados', empleado).then(function(res){
				vm.getEmpleados();
				vm.empleados="";
				vm.addempleado = false;
			});
		}
		else {
			console.log("faltan datos");
		}
	}
});