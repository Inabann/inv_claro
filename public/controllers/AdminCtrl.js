//angular.module('adminController',[])
app.controller('adminCtrl', function(User){
	var vm = this;
	vm.loading = true;
	vm.accessDenied = true;
	vm.errorMsg = false;
	vm.editAccess = false;
	vm.deleteAccess = false;
	vm.newData = {};


	vm.getUsers = function(){
		User.getUsers().then(function(data){
			if (data.data.success) {
				if (data.data.permission === 'admin' || data.data.permission === 'moderador') {
					vm.users = data.data.users;
					vm.loading = false;
					vm.accessDenied = false;
					if (data.data.permission === 'admin') {
						vm.editAccess = true;
						vm.deleteAccess = true;
					} else if (data.data.permission === 'moderador') {
						vm.editAccess = true;
					}
				} else {
					vm.errorMsg = 'Permiso Insuficiente';
					vm.loading = false;
				}
			} else {
				vm.errorMsg = data.data.message;
			}
		});
	};
	vm.getUsers();

	vm.deleteUser = function(username){
		User.deleteUser(username).then(function(data){
			if (data.data.success) {
				vm.getUsers();
			} 
		});
	};
	
	vm.regUser = function(userData){
		if (userData) {
			User.create(userData).then(function(data){
				if(data.data.success) {
					vm.getUsers();
					vm.userData = '';
				}
			})
		}
	};

	vm.updateUser = function(editData){
		if(editData){
			User.updateUser(editData).then(function(err, data){
				if(!err){
					vm.newData = '';
				}
			});
		}
	};

	vm.changePass = function(editData){
		if(editData){
			editData.password = vm.newPass;
			User.changePass(editData).then(function(err, data){
				if(!err){
					vm.newData = '';
				}
			});
		}
	};
})