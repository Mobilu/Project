
mobiluApp.controller('MapCtrl',function($scope,Firebase,$timeout,NgMap){

	$scope.text = "Conquer-Info:";

	$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLTqYGgmbIGdjSQxeRb9JjVQ5Tq4FANdc";

	NgMap.getMap().then(function(map) {
		console.log(map);
   		console.log(map.getCenter());
    	console.log('markers', map.markers);
    	console.log('shapes', map.shapes);
  	});

	Firebase.getLocData(function(data) {

		data = JSON.parse(JSON.stringify(data));
		console.log(data);

    $timeout(function() {
      	$scope.data = data;
      },1);

	});

});