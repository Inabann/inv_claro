angular.module('userControllers',['userServices'])

.controller('RegCtrl',function($http, $location, $timeout, User){
	var vm = this;

	vm.regUser = function(){
		vm.errorMsg = '';
		vm.successMsg= '';
		vm.loading = true;
		User.create(vm.userData).then(function(data){
			if (data.data.success) {
				vm.loading = false;
				vm.successMsg = data.data.message;
				$timeout(function(){
					$location.path('/');
				}, 2000);
			} else {
				vm.loading = false;
				vm.errorMsg = data.data.message;
			}
		});
	};

});
