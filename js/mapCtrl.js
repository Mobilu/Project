
mobiluApp.controller('MapCtrl',function($scope,Firebase,$timeout,$interval,NgMap,userData){
	
	onDeviceReady();
	$scope.location = [10,10];
	$scope.showLocation = [10,10];
	$scope.old = [0,0];
	var first = '<p class="fa fa-hand-';
	var last = '-o fa-3x"  aria-hidden="true"></p>';
	$scope.coor = "";
	$scope.place= "";
	var myTeam = userData.getTeam();
	var multiplier = 1;

	$scope.library = "";
	$scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyCLTqYGgmbIGdjSQxeRb9JjVQ5Tq4FANdc";

	NgMap.getMap().then(function(map) {
		map.setOptions({disableDefaultUI: true,draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true})
    	map.setOptions([
          {
            featureType: 'poi.business',
            stylers: [{visibility: 'off'}]
          },
          {
            featureType: 'transit',
            stylers: [{visibility: 'off'}]
          }
        ]);
         var center = map.getCenter();
 		google.maps.event.trigger(map, "resize");
 		map.setCenter(center);

  	});

	Firebase.getLocData(function(data) {

		data = JSON.parse(JSON.stringify(data));

		$scope.library = first + data['library'] + last;
		$scope.architecture = first + data['architecture'] + last;
		$scope.nymble = first + data['nymble'] + last;
		$scope.borggarden = first + data['borggarden'] + last;
		$scope.dbuilding = first + data['dbuilding'] + last;
		$scope.ebuilding = first + data['ebuilding'] + last;
		$scope.fbiulding = first + data['fbiulding'] + last;

    $timeout(function() {
    //  	$scope.data = data;
      },1);

	});

	$scope.conquer = function(place,coords) {

		var distance = 0;
		//distance += (coords[0] - $scope.location[0])*(coords[0] - $scope.location[0]);
		//distance += (coords[1] - $scope.location[1])*(coords[1] - $scope.location[1]);
		//distance = Math.sqrt(distance)*82.5;
		distance = getDistanceFromLatLonInKm(coords[0],coords[1],$scope.location[0],$scope.location[1]);
		if (distance >= 0.03) {
			console.log("TOO FAR AWAY")
		}
		else {
			if (place != "") {
				Firebase.conquer(place,myTeam);
				userData.addPlace(place);
				Firebase.setMyPlaces(userData.getPlacesArray());
			}
		}
	}

	function onSuccess(position) {
		var tempCoord = [position.coords.latitude, position.coords.longitude];
		$scope.location[0] = tempCoord[0]*multiplier + (1-multiplier)*$scope.old[0];
		$scope.location[1] = tempCoord[1]*multiplier + (1-multiplier)*$scope.old[1];
		
		$scope.old = $scope.location;
		multiplier = 0.2;
		$scope.showLocation = "[" + $scope.location[0] + "," + $scope.location[1] + "]";
	}

	function onDeviceReady() {
  		$interval(function() {
   			navigator.geolocation.getCurrentPosition(onSuccess);
  		}, 1000)
	}

	function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}

});