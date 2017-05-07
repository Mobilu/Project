
mobiluApp.controller('LoginCtrl',function($scope,userData,Firebase,$rootScope){

    $scope.loggedIn = false;
    $scope.user = {email:"", password:""};

    $scope.login = function() {
        if ($scope.user.email.length > 3 && $scope.user.password.length > 6) {
            Firebase.login($scope.user.email,$scope.user.password,function(value){
                if (value == true) {
                    $scope.loggedIn = true;
                    $rootScope.loggedIN = true;
                }
            });         
            

            // TODO SYNC DATA

            data = userData.getAllData();
            Firebase.getMyData(function(fData){
                if (fData.team != data[0]) {
                    userData.setTeam(fData.team);
                }
                userData.increaseDistance(fData.distance);
            })

        }
    }

    $scope.signup = function() {
        console.log($scope.user.password);
        if ($scope.user.email.length > 3 && $scope.user.password.length > 6) {
            var data = userData.getAllData();
            console.log(data);
            Firebase.newAccount($scope.user.email,$scope.user.password,data,function(value){
                if (value == true) {
                    $scope.loggedIn = true;
                    $rootScope.loggedIN = true;
                }
            });         
            //$scope.loggedIn = true;
            //$rootScope.loggedIN = true;
        }
    }

});