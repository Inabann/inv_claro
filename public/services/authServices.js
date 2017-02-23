angular.module('authServices', [])

.factory('Auth', function($http, AuthToken){
	var authFactory = {};
	authFactory.login = function (loginData) {
		return $http.post('/inv/users/auth', loginData).then(function(data){
			AuthToken.setToken(data.data.token);
			return data;
		});
	};

	authFactory.isLoggedIn = function(){
		if (AuthToken.getToken()){
			return true;
		} else {
			return false;
		}
	};

	authFactory.getUser = function(){
		if (AuthToken.getToken()){
			return $http.post('/inv/users/me');
		} else {
			$q.reject({message: 'el usuario no tiene TOKEN'});
		}
	}

	authFactory.logout = function(){
		AuthToken.setToken();
	}

	return authFactory;
})

.factory('AuthToken', function($window){
	var authTokenFactory = {};
	authTokenFactory.setToken = function(token){
		if (token){
			$window.localStorage.setItem('token', token);
		} else {
			$window.localStorage.removeItem('token');
		}
	};

	authTokenFactory.getToken = function(){
		return $window.localStorage.getItem('token');
	};

	return authTokenFactory;
})

.factory('AuthInter', function(AuthToken){
	var authInterFactory = {};
	authInterFactory.request = function(config){
		var token = AuthToken.getToken();
		if (token) {
			config.headers['x-access-token'] = token;
		}
		return config;
	};
	return authInterFactory;
})