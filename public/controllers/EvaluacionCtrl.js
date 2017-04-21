angular.module('EvaluacionControllers',[])

.controller('EvaluacionCtrl', function ($http) {
	var vm = this;
//tarjetas de productos
	vm.tarjetas = [];
	vm.ofertas = [];
	vm.cantidad = 6;
	vm.getTarjetas = function(){
		$http.get('/inv/tarjetas').then(function(res){
			vm.tarjetas = res.data;
		});
	};
	vm.getTarjetas();
	vm.getOfertas = function(){
		$http.get('/inv/tarjetas/ofertas').then(function(res){
			vm.ofertas = res.data;
		});
	};
	vm.getOfertas();

	vm.cambiar = function(filtro){
		if (filtro == 'todos'){
			vm.cantidad = 6;
			vm.cat = '';
		} else {
			vm.cat = filtro;
			vm.cantidad = 12;
		}
		
	};


//Evaluacion
	vm.errorMsg = '';
	vm.successMsg= '';

	vm.equipos = [];
	vm.getEquipos = function(){
		$http.get('/inv/equipos').then(function(res){
			vm.equipos = res.data;
		});
	}
	vm.getEquipos();
	vm.prueba = function(){
		//console.log(vm.evaluacion.equipo.originalObject, vm.evaluacion.plan, vm.modalidad);
		let epre = vm.evaluacion.equipo.originalObject.precio;
		vm.precioCalc = epre.find(x => x.plan === vm.evaluacion.plan && x.modalidad === vm.evaluacion.modalidad).precio;

	}


	vm.evaluaciones = [];

	vm.getEvaluaciones = function(){
		$http.get('/inv/evaluacion').then(function(res){
			vm.evaluaciones = res.data;
		});
	};
	vm.getEvaluaciones();

	vm.updateEvaluacion = function(evaluacion){
		if(evaluacion){
			$http.put('/inv/evaluacion', evaluacion).then(function(res){
				vm.getEvaluaciones();
			})
		}
	};

	vm.addEvaluacion = function(evaluacion){
		if (evaluacion.equipo) {
			evaluacion.equipo = evaluacion.equipo.title;
		}
		if(evaluacion && evaluacion.dni){
			if(vm.dir){
				evaluacion.correo = vm.dir.calle +'/'+ vm.dir.distrito+'/' + vm.dir.ciudad +'/'+ vm.dir.ref;
				vm.dir.calle = '';
				vm.dir.distrito = "";
				vm.dir.ciudad = "";
				vm.dir.ref = "";
			}
			console.log(evaluacion);
			$http.post('/inv/evaluacion', evaluacion).then(function(res){
				vm.getEvaluaciones();
			//	vm.evaluacion=null;
			});
		}
		else {
			console.log("faltan datos");
		}
	};

	vm.removeEvaluacion = function(evaluacion){
		if(evaluacion){	
			$http.delete('/inv/evaluacion/'+ evaluacion._id).then(function(res){
				vm.getEvaluaciones();
			});
		}
	};
});