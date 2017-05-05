
mobiluApp.controller('LoginCtrl',function($scope,userData,Firebase){

    $scope.user = {email:"", password:""};

    $scope.login = function() {
        if ($scope.user.email.length > 3 && $scope.user.password.length > 6) {
            Firebase.login($scope.user.email,$scope.user.password);            
        }
    }

    $scope.signup = function() {
        console.log("HERE");
        console.log($scope.user.password);
        if ($scope.user.email.length > 3 && $scope.user.password.length > 6) {
            Firebase.newAccount($scope.user.email,$scope.user.password,userData.getAllData());            
        }
    }

});