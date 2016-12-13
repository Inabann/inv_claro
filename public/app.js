var app = angular.module('app', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider.when('/facturas', {
		controller: 'FacturaCtrl',
		controllerAs: 'vm',
		templateUrl: 'facturas.html'
	});
	$routeProvider.when('/productos',{
		controller: 'ProductoCtrl',
		controllerAs: 'vm',
		templateUrl: 'productos.html'
		
	});
	$routeProvider.when('/logins',{
		controller: 'loginCtrl',
		controllerAs: 'vm',		
		templateUrl: 'login.html'
	});
	$routeProvider.when('/stock',{
		controller: 'StockCtrl',
		controllerAs: 'vm',
		templateUrl: 'stock.html'
	});
	$routeProvider.when('/personal',{
		controller: 'EmpleadoCtrl',
		controllerAs: 'vm',
		templateUrl: 'empleados.html'
	});
	$routeProvider.when('/reg_ventas', {
		controller: 'RegVentaCtrl',
		controllerAs: 'vm',
		templateUrl: 'reg_ventas.html'
	});
});
	

//controller login
app.controller('loginCtrl',function($scope,$location){
	scope.submit = function(){
		var uname = $scope.username;
		var password = $scope.password;
		if($scope.username == 'marco' && $scope.password == '123456'){
			$location.path('/dashboard');
		}
		else{
			alert('nombre o password incorrecto');
		}
	};
});