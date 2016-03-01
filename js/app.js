'use strict';
var app = angular.module('appName', [
  'ngRoute',
  'LocalStorageModule'
  ])
.config(function ($routeProvider, localStorageServiceProvider) {
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

  //config local storage
  localStorageServiceProvider
    .setPrefix('monopolychecker')
    .setStorageCookie(0)
    .setNotify(true, true);

});

app.constant('CONFIG', {
      appName: 'Monopoly Checker',
      version: '1.0',
      developer: 'Rattanak'
    }
);