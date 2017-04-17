app.controller('EquipoCtrl', function ($http) {
	var vm = this;
	vm.equipos = [];
	vm.detalleEquipo;
	vm.getEquipos = function(){
		$http.get('/inv/equipos').then(function(res){
			vm.equipos = res.data;
		});
	}
	vm.getEquipos();

	vm.showDetalles = function(equipo){
		vm.detalleEquipo = equipo;
		vm.detalle = true;
	}
	vm.addPrecio_Equipo = function(data){
		if (typeof data.precio === 'number'){
			vm.detalleEquipo.precio.push({modalidad : data.modalidad, fecha : data.fecha, plan : data.plan, precio : data.precio});
			$http.put('/inv/equipos/precio', vm.detalleEquipo).then(function(res){
				vm.data = undefined;
				vm.detalleEquipo = res.data;
			});
		}
		else{
			console.log("ingrese un numero");
		}
		
	}
	vm.removePrecio_Equipo = function(precio){
		vm.detalleEquipo.precio = vm.detalleEquipo.precio.filter(function(returnableObjects){
               return returnableObjects._id !== precio._id;
        });
		$http.put('/inv/equipos/precio', vm.detalleEquipo).then(function(res){
			console.log(res.data);
			vm.detalleEquipo = res.data;
		});
	}

	vm.addEquipo = function(equipo){
		if(equipo && equipo.nombre){
			console.log("nuevo equipo");
			$http.post('/inv/equipos', equipo).then(function(res){
				vm.getEquipos();
				vm.equipos="";
				vm.equipo = "";
			});
		}
		else {
			console.log("faltan datos");
		}
	}
	vm.updateEquipo = function(equipo){
		if(equipo){
			$http.put('/inv/equipos', equipo).then(function(res){
				vm.getEquipos();
			})
		}
	}
	
	vm.removeEquipo = function(equipo){
		if(equipo){
			$http.delete('/inv/equipos/'+ equipo._id).then(function(res){
				console.log('equipo eliminado');
				vm.getEquipos();
			});
		}
	}
});