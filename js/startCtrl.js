
mobiluApp.controller('StartCtrl',function($scope){
	
	$scope.text = "LOGIN SOMEWHERE";

	$scope.play = function() {
		//$location.path("/play");
		window.location.hash = "#!/play";
	}

});