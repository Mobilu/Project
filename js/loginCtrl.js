
mobiluApp.controller('LoginCtrl',function($scope,userData,Firebase,$rootScope){

    $scope.loggedIn = false;
    $scope.user = {email:"", password:""};

    $scope.login = function() {
        if ($scope.user.email.length > 3 && $scope.user.password.length > 6) {
            Firebase.login($scope.user.email,$scope.user.password);         
            $scope.loggedIn = true;
            $rootScope.loggedIN = true;
        }
    }

    $scope.signup = function() {
        console.log($scope.user.password);
        if ($scope.user.email.length > 3 && $scope.user.password.length > 6) {
            var data = userData.getAllData();
            console.log(data);
            Firebase.newAccount($scope.user.email,$scope.user.password,data);            
            $scope.loggedIn = true;
            $rootScope.loggedIN = true;
        }
    }

});