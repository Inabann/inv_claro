angular.module('userServices', [])

.factory('User', function($http){
	userFactory = {};
	userFactory.create = function(userData){
		return $http.post('/inv/users', userData);
	};

	userFactory.getPermission = function(){
		return $http.get('/inv/users/permission');
	};

	userFactory.getUsers = function(){
		return $http.get('/inv/users/admin');
	};

	userFactory.deleteUser = function(username){
		return $http.delete('/inv/users/'+username);
	};

	userFactory.updateUser = function(data){
		return $http.put('/inv/users/', data);
	};

	userFactory.changePass = function(data){
		return $http.put('/inv/users/pass', data);
	};

	return userFactory;
});
