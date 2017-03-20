angular.module('EvaluacionControllers',[])

.controller('EvaluacionCtrl', function ($http) {

	var vm = this;
	vm.evaluaciones = [];


	vm.getEvaluaciones = function(){
		$http.get('/inv/evaluaciones').then(function(res){
			vm.evaluaciones = res.data;
		});
	};
	vm.getEvaluaciones();

	
	
	vm.addEvaluacion = function(evaluacion){
		if(evaluacion && evaluacion.dni){
			console.log("evaluacion agregado");
			
			$http.post('/inv/evaluaciones', evaluacion).then(function(res){
				vm.getEvaluaciones();
				vm.evaluacion="";
				vm.evaluaciones = "";
			});
		}
		else {
			console.log("faltan datos");
		}
	};
});