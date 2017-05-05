
mobiluApp.controller('MapCtrl',function($scope,Firebase,$timeout){

	$scope.text = "Conquer-Info:";

	Firebase.getLocData(function(data) {

		data = JSON.parse(JSON.stringify(data));

    $timeout(function() {
      	$scope.data = data;
      },1);

	});

});