var app = angular.module('app', ['ngRoute','ngFileUpload','userControllers','EvaluacionControllers','mainController','userServices','authServices']);

app.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInter');
});

app.config(function ($routeProvider) {
	$routeProvider.when('/facturas', {
		controller: 'FacturaCtrl',
		controllerAs: 'vm',
		templateUrl: 'facturas.html',
		authenticated: true
	});
	$routeProvider.when('/productos',{
		controller: 'ProductoCtrl',
		controllerAs: 'vm',
		templateUrl: 'productos.html',
		authenticated: true
		
	});
	$routeProvider.when('/stock',{
		controller: 'StockCtrl',
		controllerAs: 'vm',
		templateUrl: 'stock.html',
		authenticated: true
	});
	$routeProvider.when('/personal',{
		controller: 'EmpleadoCtrl',
		controllerAs: 'vm',
		templateUrl: 'empleados.html',
		authenticated: true
	});
	$routeProvider.when('/reg_ventas', {
		controller: 'RegVentaCtrl',
		controllerAs: 'vm',
		templateUrl: 'reg_ventas.html',
		authenticated: true
	});
	$routeProvider.when('/register', {
		controller: 'RegCtrl',
		controllerAs: 'vm',
		templateUrl: 'users/register.html',
		authenticated: true
	});
	$routeProvider.when('/login', {
		controller: 'mainCtrl',
		controllerAs: 'vm',
		templateUrl: 'users/login.html',
		authenticated: false
	});
	$routeProvider.when('/logout', {
		//controller: 'mainCtrl',
		//controllerAs: 'vm',
		templateUrl: 'users/logout.html',
		authenticated: true
	});
	$routeProvider.when('/evaluacion', {
		controller: 'EvaluacionCtrl',
		controllerAs: 'vm',
		templateUrl: 'evaluacion.html',
		authenticated: true
	});
	$routeProvider.when('/',{
		controller: 'EvaluacionCtrl',
		controllerAs: 'vm',
		templateUrl: 'home/home.html',
		authenticated: false
	});
	$routeProvider.when('/tarjetas', {
		controller: 'TarjetaCtrl',
		controllerAs: 'vm',
		templateUrl: 'tarjetas.html',
		authenticated: true
	});
});

app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location){
	$rootScope.$on('$routeChangeStart', function(event, next, current){
		if (next.$$route.authenticated == true) {
			if (!Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/');
			}
		} else if(next.$$route.authenticated == false){
			if(Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/reg_ventas');
			}
		} else {
			console.log('usuario no importa');
		}
	});
}]);