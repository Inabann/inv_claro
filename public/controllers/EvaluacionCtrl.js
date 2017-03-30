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
	};

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

	vm.removeEvaluacion = function(evaluacion){
		if(evaluacion){
			console.log("evaluacion eliminada");	
			$http.delete('/inv/evaluacion/'+ evaluacion._id).then(function(res){
				vm.getEvaluaciones();
			});
		}
	};
});