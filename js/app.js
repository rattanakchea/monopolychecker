'use strict';
var app = angular.module('appName', [
  'ngRoute'
  ])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl',
    controllerAs: 'main'
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'HomeCtrl',
    controllerAs: 'main'
  })
  .otherwise({
    redirectTo: '/'
  });
});