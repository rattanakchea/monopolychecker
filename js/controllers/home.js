'use strict';

var app = app || {};

app.controller('HomeCtrl', function($scope, $location, CONFIG, $rootScope, localStorageService) {

    $rootScope.appName = CONFIG.appName;
    $scope.prizes = prizes;




    $scope.resetGame = function() {
        if (confirm('Are you sure? ')) {
            localStorageService.clearAll();
            initGame();
        }
    };

   	function updateCurrentGame(){
   		$scope.currentGame = localStorageService.get('currentGame');
   	}
    
   
    function initGame() {
        var lsKeys = localStorageService.keys();
        console.log('keys: ', lsKeys);

        if (lsKeys.length == 0) {
            localStorageService.set('game-1', alphabets);
            localStorageService.set('currentGame', 'game-1');
            $scope.alphabets = alphabets;
        } else {
            $scope.gameArray = [];
            lsKeys.forEach(function(element, key) {
                if (element.indexOf('game') > -1) {
                    $scope.gameArray.push(element);
                }
            })
            var currentGame = localStorageService.get('currentGame') || lsKeys[0];
            $scope.alphabets = localStorageService.get(currentGame);
            updateCurrentGame();
        }
    }

    $scope.createNewGame = function() {
        
        if ($scope.gameArray.length > 2){
        	alert("Hey you can only up to 3 games");
        	return;
        }

        var last = $scope.gameArray[$scope.gameArray.length -1];

        //replace last char
        var newNum = parseInt(last[last.length -1]) + 1
        var key = last.slice(0,-1) + newNum;

        $scope.gameArray.push(key);
        localStorageService.set(key, alphabets);
        localStorageService.set('currentGame', key);
        updateCurrentGame();

        $scope.alphabets = alphabets;
    }


    $scope.loadGame = function(key) {
    	//console.log('key: ', key);
    	localStorageService.set('currentGame', key);
    	updateCurrentGame();

        $scope.alphabets = localStorageService.get(key);
    };

    $scope.deleteGame = function(key) {	
    	localStorageService.remove(key);
    	localStorageService.remove('currentGame');
    	initGame();
    }

    if (localStorageService.isSupported) {

        initGame();
    }

    $scope.change = function(index, entry) {
        console.log('value: ', index, entry);
        //save to localstorage
        save();
        $scope.checkResult();
    };


    var btnCheckResultClicked = false;

    //todo check group result
    function checkGroupResult() {

    }

    //if all in entries in a group are true
    $scope.checkResult = function() {

        //toggle alert message
        btnCheckResultClicked = true;

        $scope.results = [];
        angular.forEach($scope.alphabets, function(group, key) {
            for (var i = 0; i < group.entries.length; i++) {
                var entry = group.entries[i];
                if (!entry.selected) {
                    return;
                }
            }

            var text = 'You won group ' + group.group + ' : ' + prizes[key];
            this.push({
                text: text
            });


        }, $scope.results);
    };

    $scope.isWinning = function() {
        if (!btnCheckResultClicked) {
            return true;
        }
        if ($scope.results.length == 0) {
            return false;
        } else {
            return true;
        }
    };

    function checkGroupEntries(element, index, array) {
        if (!element.selected)
            return false;
    }

    function save() {
    	var currentGame =  localStorageService.get('currentGame');
        localStorageService.set(currentGame, $scope.alphabets);
    }


    $scope.addEntry = function(entry) {
        //check length
        if (entry.length < 5 || entry.length > 5) {
            alert('Invalid Entry. Entry must have 5 characters');
            return;
        }

        //check if entry is valid
        var regEx = /\D\d{3}[abcdefgh]/i;

        //pass regular express test
        if (regEx.test(entry)) {
            //get the first char
            entry = entry.toLowerCase();

            if (entry[0] == '$') {
                lookupInput($scope.alphabets[26].entries, entry);
                return;
            }
            if (entry[0] == '?') {
                lookupInput($scope.alphabets[27].entries, entry);
                return;
            }


            var index = entry.charCodeAt(0) - 97;

            //console.log('index: ', index);
            //console.log($scope.alphabets);
            lookupInput($scope.alphabets[index].entries, entry);

        } else {
            $scope.inputEntry = null;
        }
    };

    function lookupInput(entries, entry) {
        //console.log(entries);
        angular.forEach(entries, function(item, k) {
            if (item.key.toLowerCase() == entry) {
                if (item.selected) {
                    alert("Entry was previously added");
                } else {
                    item.selected = true;
                    alert('Add Successfully');
                    save();
                    $scope.inputEntry = null;
                }
                return;
            }
        });
    }

    $scope.generateDownloadLink = function(){
    	//var base64Data = encodeURIComponent($scope.alphabets);

    	var base64Data = btoa(JSON.stringify(localStorageService.get(localStorageService.get('currentGame'))));
    	$('#download').attr('href', 'data:application/text-json;base64,' + base64Data).show();
    };

    $scope.showTextArea = function(){
    	$('#importData').show();
    	$scope.sampleData = JSON.stringify(alphabets);
    };

    $scope.importData = function(data){

    	//valid data
    	var data = JSON.parse(data);
    	if (data.length != 28){
    		alert("Look like data is not valid. Make sure you import data from the data that was exported before");
    		return;
    	}

    	var currentGame = localStorageService.get('currentGame');
    	localStorageService.set(currentGame, data); 	
    	$scope.alphabets = localStorageService.get(currentGame);
    	$('#importData').slideUp();
    };


});
