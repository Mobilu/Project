
mobiluApp.controller('ChatCtrl',function($scope,userData,Firebase){

    $scope.team = userData.getTeam();

    $scope.loggedIN = Firebase.loggedInFunc();
    $scope.logi = false;

    $scope.logInOrSignUp = function() {
    	$scope.logi = !$scope.logi;
    }

});