
mobiluApp.controller('ChatCtrl',function($scope,userData,Firebase,$timeout,$rootScope){

    $scope.team = userData.getTeam();
    $scope.logi = false;
    $rootScope.loggedIN = Firebase.amIloggedIn();
    $scope.messageList = [];
    $scope.msginput = "";

    $scope.sendmsg = function(){
        Firebase.sendMessage($scope.team,$scope.msginput,$scope.chatuser)
    };

    $scope.messageReader = function(){
        Firebase.messageReader($scope.team,function(data){
            $scope.messageList = data;
            //console.log(data);
        })
    }

    $scope.messageReader();

});
