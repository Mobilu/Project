
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
	
	function showPosition(position) {
		//console.log(position.coords);
		var distance = 0;
		distance += ($scope.coor[0] - position.coords.latitude)*($scope.coor[0] - position.coords.latitude);
		distance += ($scope.coor[1] - position.coords.longitude)*($scope.coor[1] - position.coords.longitude)
		distance = Math.sqrt(distance)*82.5;
		if (distance >= 0.05) {
			console.log("TOO FAR AWAY")
		}
		else {
			if ($scope.place != "") {
				Firebase.conquer($scope.place,myTeam);
				userData.addPlace($scope.place);
				Firebase.setMyPlaces(userData.getPlacesArray());
			}
		}
	}

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
		$scope.place = place;
		$scope.coor  = coords;
		navigator.geolocation.getCurrentPosition(showPosition);
	}

	function onSuccess(position) {
		var tempCoord = [position.coords.latitude, position.coords.longitude];
		$scope.location[0] = tempCoord[0]*multiplier + (1-multiplier)*$scope.old[0];
		$scope.location[1] = tempCoord[1]*multiplier + (1-multiplier)*$scope.old[1];
		
		$scope.old = $scope.location;
		multiplier = 0.2;
		$scope.showLocation = "[" + ($scope.location[0]-0.008346800000005317) + "," + ($scope.location[1]-0.013561799999997959) + "]";
		//console.log($scope.showLocation)
	}

	function onDeviceReady() {
  		$interval(function() {
   			navigator.geolocation.getCurrentPosition(onSuccess);
  		}, 1000)
	}

});