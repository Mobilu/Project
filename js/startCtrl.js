
mobiluApp.controller('StartCtrl',function($scope){
	
	$scope.text = "Testing";

	$scope.play = function() {
		//$location.path("/play");
		window.location.hash = "#!/play";
	}

});