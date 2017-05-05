
mobiluApp.controller('StartCtrl',function($scope,userData){

	$scope.play = function(team) {
		userData.setTeam(team);
		window.location.hash = "#!/play";
	}

});