
mobiluApp.controller('ScoreCtrl',function($scope,userData,Firebase,$timeout,$rootScope){

    $scope.team2 = userData.getTeam();
    Firebase.getLocDataNumber($scope.team2,function(data){
		$scope.number = data[0];
		$scope.total = data[1];
	})


        Firebase.getMyPlaces(function(cbData){
            //$scope.yourNumber = cbData;
            $timeout(function() {
                $scope.yourNumber = cbData;
                //console.log(cbData);
            },1);
        })
    

    //$scope.yourNumber = userData.getPlaces().length;

    Firebase.getTeamData(function(data){
    	$scope.paper = data.paper;
    	$scope.rock = data.rock;
    	$scope.scissors = data.scissors;
    })

});