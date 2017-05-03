
var mobiluApp = angular.module('mobilu', ['ngRoute','ngResource']);

mobiluApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/start', {
        templateUrl: 'partials/start.html',
		    controller: 'StartCtrl'
      }).
      otherwise({
        redirectTo: '/start'
      });
  }]);