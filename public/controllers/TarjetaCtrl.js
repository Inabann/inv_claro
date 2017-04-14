app.controller('TarjetaCtrl', function ($http, $scope, Upload) {
	var vm = this;
	vm.previewName = '';
	vm.file = undefined;
	vm.preview = function(){
		vm.previewName = vm.file.name;
	}

	vm.tarjetas = [];
	vm.getTarjetas = function(){
		$http.get('/inv/tarjetas').then(function(res){
			vm.tarjetas = res.data;
		});
	};
	vm.getTarjetas();

	vm.upload = function(){
		Upload.upload({
			url: '/inv/tarjetas',
			data: {file: vm.file, datos: vm.tarjeta}
		}).then(function(res){
			vm.tarjeta = null;
			vm.file = undefined;
			vm.getTarjetas();
		},function(res){
			console.log('Error status: ' + res.status);
		});
	};

	vm.remove = function(tarjeta){
		$http.delete('/inv/tarjetas/'+ tarjeta._id + '/'+tarjeta.public_id).then(function(res){
			vm.getTarjetas();
		});
	}
});