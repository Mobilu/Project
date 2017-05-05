
mobiluApp.controller('ChatCtrl',function($scope,userData,Firebase){

    $scope.team = userData.getTeam();

    $scope.loggedIN = Firebase.loggedInFunc();

    $scope.login = function() {
    	$scope.loggedIN = true;
    }

	$scope.signup = function() {
    	$scope.loggedIN = true;
    	console.log("YAS")
    }

});