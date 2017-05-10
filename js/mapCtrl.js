
mobiluApp.controller('MapCtrl',function($scope,Firebase,$timeout,NgMap){
	var first = '<p class="fa fa-hand-';
	var last = '-o fa-3x"  aria-hidden="true"></p>';
	$scope.coor = "";
	$scope.place= "";
	//var first = ""; var last = "";
	
	function showPosition(position) {
		//console.log(position.coords);
		var distance = 0;
		distance += ($scope.coor[0] - position.coords.latitude)*($scope.coor[0] - position.coords.latitude);
		distance += ($scope.coor[1] - position.coords.longitude)*($scope.coor[1] - position.coords.longitude)
		console.log(Math.sqrt(distance)*82.5);
		//console.log($scope.place);

	}

	$scope.text = "Info:";
	$scope.library = "";
	$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLTqYGgmbIGdjSQxeRb9JjVQ5Tq4FANdc";

	NgMap.getMap().then(function(map) {
		map.setOptions({disableDefaultUI: true,draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true})
		console.log(map);
   		console.log(map.getCenter());
    	console.log('markers', map.markers);
    	console.log('shapes', map.shapes);
    	map.setOptions([
          {
            featureType: 'poi.business',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'transit',
            elementType: 'labels.icon',
            stylers: [{visibility: 'off'}]
          }
        ]);

  	});

	Firebase.getLocData(function(data) {

		data = JSON.parse(JSON.stringify(data));
		console.log(data);

		$scope.library = first + data['library'] + last;
		$scope.architecture = first + data['architecture'] + last;
		$scope.nymble = first + data['nymble'] + last;
		$scope.borggarden = first + data['borggarden'] + last;
		$scope.dbuilding = first + data['dbuilding'] + last;
		$scope.ebuilding = first + data['ebuilding'] + last;
		$scope.fbiulding = first + data['fbiulding'] + last;
		$scope.me = first + "peace" + last;

    $timeout(function() {
    //  	$scope.data = data;
      },1);

	});

	$scope.conquer = function(place,coords) {
		$scope.place = place;
		$scope.coor  = coords;
		navigator.geolocation.getCurrentPosition(showPosition);
	}

});