
mobiluApp.controller('LoginCtrl',function($scope,userData,Firebase,$rootScope){

    $scope.loggedIn = false;
    $scope.user = {email:"", password:"", confirm:""};
    $scope.creating = false;

    $scope.login = function() {
        if ($scope.user.email.length > 3 && $scope.user.password.length > 6) {
            Firebase.login($scope.user.email,$scope.user.password,function(value){
                if (value == true) {
                    $scope.loggedIn = true;
                    $rootScope.loggedIN = true;
                }
            });         
            
            $scope.user = {email:"", password:""};
            // TODO SYNC DATA

            data = userData.getAllData();
            Firebase.getMyData(function(fData){
                //console.log(fData)
                if (fData != null) {
                    if (fData.team != data[0]) {
                        userData.setTeam(fData.team);
                    }
                userData.increaseDistance(fData.distance);
                }
                
            })

        }
    }

    $scope.signup = function() {
        if ($scope.user.email.length > 3 && $scope.user.password.length > 6 && $scope.user.confirm == $scope.user.password) {
            var data = userData.getAllData();
            //console.log(data);
            Firebase.newAccount($scope.user.email,$scope.user.password,data,function(value){
                if (value == true) {
                    $scope.loggedIn = true;
                    $rootScope.loggedIN = true;
                    $scope.creating = false;
                }
            });         
            $scope.user = {email:"", password:"",confirm:""};
            Firebase.setMyPlaces(userData.getPlacesArray())
        }
        else {
            ons.notification.alert({
                message: 'Please make sure you have a valid email adress & have confirmed your password correctly.'
            })
        }
    }

    $scope.logout = function() {
        Firebase.signOut();
        $scope.loggedIn = false;
        $rootScope.loggedIN = false;
    }

    $scope.newacc = function() {
        $scope.creating = true;
    }

    $scope.cancel = function() {
        $scope.creating = false;
    }

});