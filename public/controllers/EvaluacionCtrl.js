angular.module('EvaluacionControllers',[])

.controller('EvaluacionCtrl', function ($http) {
	var vm = this;
//tarjetas de productos
	vm.tarjetas = [];
	vm.ofertas = [];
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
		vm.cat = filtro;
	};


//Evaluacion


    vm.planes = [{plan: 'claro max 39'},{plan: 'claro max 49'},{plan: 'claro max 59'},{plan: 'claro max 69'},{plan: 'claro max 79'},{plan: 'claro max 89'},{plan: 'claro max 99'},{plan: 'claro max 119'}
    			,{plan: 'claro max 149'},{plan: 'claro max 189'},{plan: 'claro max 289'}]
	vm.equipos = [];
	vm.getEquipos = function(){
		$http.get('/inv/equipos').then(function(res){
			vm.equipos = res.data;
		});
	}
	vm.getEquipos();
	vm.prueba = function(){
		console.log(vm.equipo.originalObject.precio);
	}
	vm.mostrarPrecio = function(equipo, plan){
		console.log(equipo);
		console.log(plan);
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
		
		evaluacion.plan = evaluacion.plan.title;
		evaluacion.equipo = evaluacion.equipo.title;

		if(evaluacion && evaluacion.dni){
			console.log("evaluacion agregado");
			$http.post('/inv/evaluacion', evaluacion).then(function(res){
				vm.getEvaluaciones();
				vm.evaluacion="";
				vm.evaluaciones = "";
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