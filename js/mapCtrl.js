
mobiluApp.controller('MapCtrl',function($scope,Firebase,$timeout,NgMap){
	var first = '<p class="fa fa-hand-';
	var last = '-o fa-4x"  aria-hidden="true"></p>';

	//var first = ""; var last = "";

	$scope.text = "Conquer-Info:";
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

		//for (item in data){
		//	console.log(item);
		//	//document.getElementById(item).innerHTML = '<i class="fa fa-' + data[item]+ '" aria-hidden="true"></i>'
		//	$scope.myHTML = first+data[item]+last;
		//}

		$scope.library = first + data['library'] + last;
		$scope.architecture = first + data['architecture'] + last;
		$scope.nymble = first + data['nymble'] + last;
		$scope.borggarden = first + data['borggarden'] + last;
		$scope.dbuilding = first + data['dbuilding'] + last;
		$scope.ebuilding = first + data['ebuilding'] + last;
		$scope.fbiulding = first + data['fbiulding'] + last;

    $timeout(function() {
      	$scope.data = data;
      },1);

	});

});