
mobiluApp.controller('ChatCtrl',function($scope,userData,Firebase,$timeout,$rootScope){

    $scope.team = userData.getTeam();
    $scope.logi = false;
    $rootScope.loggedIN = Firebase.amIloggedIn();

});