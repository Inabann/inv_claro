angular.module('userServices', [])

.factory('User', function($http){
	userFactory = {};
	userFactory.create = function(userData){
		return $http.post('/inv/users', userData);
	}
	return userFactory;
});
