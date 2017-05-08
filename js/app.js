
var mobiluApp = angular.module('mobilu', ['ngRoute','ngResource','onsen','ngMap']);

mobiluApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/start', {
        templateUrl: 'partials/start.html',
		    controller: 'StartCtrl'
      }).
      when('/play', {
        templateUrl: 'partials/play.html',
        controller: 'PlayCtrl'
      }).
      otherwise({
        redirectTo: '/start'
      });
  }]);