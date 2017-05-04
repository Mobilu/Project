
mobiluApp.controller('PlayCtrl',function($scope,Firebase,$timeout){
	
	$scope.text = "Playing";

	Firebase.getLocData(function(data) {
		//$scope.data = JSON.stringify(data);
		data = JSON.parse(JSON.stringify(data))
    	$timeout(function() {
    		//var output = "";
    		//for (item in data) {
    		//	output += item + " belongs to team: " + data[item] + "! \n\n";
    		//	console.log(item);
    		//}
    		console.log(data);
      		$scope.data = data;
      	},1);

	});

});