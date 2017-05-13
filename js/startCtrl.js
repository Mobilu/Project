
mobiluApp.controller('StartCtrl',function($scope,userData){

	var team = userData.getTeam();

	if (team == '""') {
		$scope.rock = false;
		$scope.paper = false;
		$scope.scissors = false;
	}
	else if (team == "rock") {
		$scope.paper = true;
		$scope.scissors = true;
	}
	else if (team == "paper") {
		$scope.rock = true;
		$scope.scissors = true;
	}
	else if (team == "scissors") {
		$scope.rock = true;
		$scope.paper = true;
	}
	

	$scope.play = function(team) {
		var current = userData.getTeam();
		
		if (current == '""') {
			userData.setTeam(team);
		}
		//hyper.log(window.location)
		//window.location = "/#!/play";
		window.location.hash = "!/play";
		//hyper.log(window.location)
	}
});