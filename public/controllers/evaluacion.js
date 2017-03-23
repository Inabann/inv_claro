angular.module('EvaluacionControllers',[])

.controller('EvaluacionCtrl', function ($http) {

	var vm = this;
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
				console.log('update evaluacion');
				vm.getEvaluaciones();
			})
		}
	}

<<<<<<< HEAD
=======
	
	
>>>>>>> dd00d32469f5cbbbd0907ef60c3b0dcb8adfa330
	vm.addEvaluacion = function(evaluacion){
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
<<<<<<< HEAD

	vm.removeEvaluacion = function(evaluacion){
		if(evaluacion){
			console.log("evaluacion eliminada");	
			$http.delete('/inv/evaluacion/'+ evaluacion._id).then(function(res){
				vm.getEvaluaciones();
			});
		}
	}
=======
>>>>>>> dd00d32469f5cbbbd0907ef60c3b0dcb8adfa330
});