
mobiluApp.controller('StartCtrl',function($scope,userData){

	$scope.rock = false;
	$scope.paper = false;
	$scope.scissors = false;

	$scope.play = function(team) {
		var current = userData.getTeam();
		
		if (current == '""') {
			userData.setTeam(team);

			if (team == "rock") {
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
		}
		//hyper.log(window.location)
		//window.location = "/#!/play";
		window.location.hash = "!/play";
		//hyper.log(window.location)
	}
});