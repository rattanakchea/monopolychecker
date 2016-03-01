'use strict';

var app = app || {};

app.controller('HomeCtrl', function($scope, $location, CONFIG, $rootScope, localStorageService) {

    $rootScope.appName = CONFIG.appName;

    $scope.prizes = prizes;

    $scope.resetGame = function(){
    	if (confirm('Are you sure? ')){
    		localStorageService.clearAll();
    		localStorageService.set('data', alphabets);
    		$scope.alphabets = localStorageService.get('data');
    	}
    };

    if (localStorageService.isSupported) {
        console.log('localstorage is supported');

        //if no localstorage on key 'data'
        if (!localStorageService.get('data')) {
            localStorageService.set('data', alphabets)
        } else {
            $scope.alphabets = localStorageService.get('data');
            console.log($scope.alphabets);
        }
    }

    $scope.change = function(index, entry) {
        console.log('value: ', index, entry);

        //make changes to $scope.alphabets

        //save to localstorage
        save();
    };


	var btnCheckResultClicked = false;

    //if all in entries in a group are true
    $scope.checkResult = function() {
    	
    	//toggle alert message
    	btnCheckResultClicked = !btnCheckResultClicked;

    	$scope.results = [];
        angular.forEach($scope.alphabets, function(group, key) {
           for(var i=0; i < group.entries.length; i++){
           	 	 var entry = group.entries[i];
           	 	 if (!entry.selected) {
           	 	 	return
           	 	 }
           }

           var text = 'You won group ' + group.group + ' : ' + prizes[key];
           this.push({text: text
       				});


        }, $scope.results);
    };

    $scope.isWinning = function(){
    	if (!btnCheckResultClicked) {
    		return true;
    	}
    	if ($scope.results.length == 0){
        	return false;
        } else {
        	return true;
        }
    };

    function checkGroupEntries(element, index, array){
    	if (!element.selected)
    		return false;
    }

    function save() {
        localStorageService.set('data', $scope.alphabets);
    }

});
