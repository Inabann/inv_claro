var app = angular.module('app', ['ngRoute','ngFileUpload','userControllers','EvaluacionControllers','mainController','userServices','authServices', 'angucomplete-alt']);

app.config(function($httpProvider) {
	$httpProvider.interceptors.push('AuthInter');
});

app.config(function ($routeProvider) {
	$routeProvider.when('/facturas', {
		controller: 'FacturaCtrl',
		controllerAs: 'vm',
		templateUrl: 'facturas.html',
		authenticated: true,
		permission: ['admin', 'moderador']
	});
	$routeProvider.when('/productos',{
		controller: 'ProductoCtrl',
		controllerAs: 'vm',
		templateUrl: 'productos.html',
		authenticated: true,
		permission: ['admin', 'moderador']
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
		authenticated: true,
		permission: ['admin', 'moderador']
	});
	$routeProvider.when('/reg_ventas', {
		controller: 'RegVentaCtrl',
		controllerAs: 'vm',
		templateUrl: 'reg_ventas.html',
		authenticated: true,
		permission: ['admin', 'moderador']
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
		authenticated: false,
		permission: ['admin', 'moderador']
	});
	$routeProvider.when('/tarjetas', {
		controller: 'TarjetaCtrl',
		controllerAs: 'vm',
		templateUrl: 'tarjetas.html',
		authenticated: true,
		permission: ['admin', 'moderador']
	});
	$routeProvider.when('/admin', {
		templateUrl: 'admin/admin.html',
		controller: 'adminCtrl',
		controllerAs: 'vm',
		authenticated: true,
		permission: ['admin', 'moderador']
	});
	$routeProvider.when('/equipos', {
		controller: 'EquipoCtrl',
		controllerAs: 'vm',
		templateUrl: 'equipo.html',
		authenticated: true,
		permission: ['admin', 'moderador']
	});
});

app.run(['$rootScope', 'Auth', '$location', 'User', function($rootScope, Auth, $location, User){
	$rootScope.$on('$routeChangeStart', function(event, next, current){
		if (next.$$route.authenticated == true) {
			if (!Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/');
			} else if (next.$$route.permission) {
				User.getPermission().then(function(data){
					if (next.$$route.permission[0] !== data.data.permission) {
						if (next.$$route.permission[1] !== data.data.permission) {
							event.preventDefault();
							$location.path('/');
						}
					}
				});
			}
		} else if(next.$$route.authenticated == false){
			if(Auth.isLoggedIn()){
				event.preventDefault();
				$location.path('/stock');
			}
		} else {
			console.log('usuario no importa');
		}
	});
}]);