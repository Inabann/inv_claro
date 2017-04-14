angular.module('mainController', ['authServices', 'userServices'])

.controller('mainCtrl', function(Auth, User, $timeout, $location, $rootScope){
	var vm = this;
	vm.loadme = false;
	$rootScope.$on('$routeChangeStart', function(){
		if (Auth.isLoggedIn()){
			vm.isLoggedIn = true;
			Auth.getUser().then(function(data){
				vm.username = data.data.username;
				User.getPermission().then(function(data){
					if (data.data.permission == 'admin' || data.data.permission == 'moderador') {
						vm.authorized = true;
						vm.loadme = true;
					} else {
						vm.loadme = true;
						vm.authorized = false;
					}
				});
			});
		} else {
			vm.isLoggedIn = false;
			vm.username = '';
			vm.loadme = true;
		}
	});

	vm.doLogin = function(loginData){
		vm.errorMsg = '';
		vm.successMsg= '';
		vm.loading = true;
		Auth.login(vm.loginData).then(function(data){
			if (data.data.success) {
				vm.loading = false;
				vm.successMsg = data.data.message;
				$timeout(function(){
					$location.path('/stock');
					vm.loginData = '';
					vm.successMsg = false;
				}, 2000);
			} else {
				vm.loading = false;
				vm.errorMsg = data.data.message;
			}
		});
	};

	vm.logout = function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function(){
			$location.path('/')
		},2000);
	};

});