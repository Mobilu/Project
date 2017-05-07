
mobiluApp.controller('ScoreCtrl',function($scope,userData,Firebase,$rootScope){

    $scope.team = userData.getTeam();
    Firebase.getLocDataNumber($scope.team,function(data){
		$scope.number = data[0];
		$scope.total = data[1];
	})
   
    $scope.yourNumber = userData.getPlaces().length;
    $scope.distance = userData.getDistance()

});