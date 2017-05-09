
mobiluApp.controller('PlayCtrl',function($scope,userData){

	$scope.team = "hand-scissors-o";

	var first = "hand-"
	var last = "-o"

    $scope.team = first + userData.getTeam() + last;

});