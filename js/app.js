
var mobiluApp = angular.module('mobilu', ['ngRoute','ngResource','onsen','ngMap','ngSanitize']);

mobiluApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/start', {
        templateUrl: 'partials/start.html',
		    controller: 'StartCtrl'
      }).
      when('/play', {
        templateUrl: 'partials/play.html'
      }).
      otherwise({
        redirectTo: '/start'
      });
  }]);