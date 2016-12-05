app.controller('StockCtrl', function($http){
	var vm = this;
	vm.stock = [];

	vm.getStock = function(){
		$http.get('/inv/stock').then(function(res){
			vm.stock = res.data;
		});
	};

	vm.getStock();
});