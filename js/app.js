'use strict';
var app = angular.module('appName', [
  'ngRoute'
  ])
.config(function ($routeProvider) {
  $routeProvider
  .when('/', {
    templateUrl: 'views/home.html',
    controller: 'HomeCtrl'
  })
  .when('/about', {
    templateUrl: 'views/about.html',
    controller: 'HomeCtrl'
  })
  .otherwise({
    redirectTo: '/'
  });
});

app.constant('CONFIG', {
      appName: 'Monopoly Checker',
      version: '1.0',
      developer: 'Rattanak'
    }
);