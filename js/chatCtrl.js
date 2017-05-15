
mobiluApp.controller('ChatCtrl',function($scope,userData,Firebase,$timeout,$rootScope){

    $scope.team = userData.getTeam();
    $scope.logi = false;
    $rootScope.loggedIN = Firebase.amIloggedIn();
    $scope.messageList = [];
    $scope.msginput = "";

    $scope.f = firebase.database().ref("chatrooms/rockchat");
    $scope.f.on('value', function(snapshot) {
       messageList.push(snapshot.val());
    });

    $scope.sendmsg = function(){
    	var db = firebase.database();
    	var chatRoom;
    	if ($scope.team == "paper") {
    		var chatRoom = "chatrooms/paperchat";
    	}
    	else if ($scope.team == "rock") {
    		var chatRoom = "chatrooms/rockchat";
    	}
    	else {
    		var chatRoom = "chatrooms/scissorchat";
    	};
		var msgMondiale = db.ref(chatRoom);
		var name = $scope.chatuser;
   		var msg =  $scope.msginput;
   		msgMondiale.push([name,msg]);
   		//$scope.updateText(msgMondiale.val());
        //$scope.messageList = firebase.database().ref(chatRoom).value().val();
        $scope.updateText();

    };

    $scope.updateText = function(){
    	/*var element = {
    	    mess: $scope.msginput
        }

        $scope.messageList.push(element);*/

    };

});
