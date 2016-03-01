'use strict';

var app = app || {};

app.controller('HomeCtrl', function ($scope, $location, CONFIG, $rootScope) {

	$rootScope.appName = CONFIG.appName;

	
});