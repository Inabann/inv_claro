var app = angular.module('app', ['ngRoute']);



app.config(function ($routeProvider) {
	$routeProvider.when('/', {
		controller: 'FacturaCtrl',
		controllerAs: 'vm',
		templateUrl: 'facturas.html'
	});
	//$routeProvider.otherwhise('/');

});
app.controller('FacturaCtrl', function ($http) {
	var vm = this;
	vm.facturas = [];
	vm.getFacturas = function(){
		$http.get('/inv/facturas').then(function(res){
			vm.facturas = res.data;
		});
	}
	vm.getFacturas();
	
	vm.updateFactura = function(factura){
		if(factura){
			$http.put('/inv/facturas', factura).then(function(res){
				console.log('update user');
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
			console.log("crear factura");
			
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