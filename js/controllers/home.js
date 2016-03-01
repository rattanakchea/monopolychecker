'use strict';

var app = app || {};

app.controller('HomeCtrl', function($scope, $location, CONFIG, $rootScope, localStorageService) {

    $rootScope.appName = CONFIG.appName;
    $scope.prizes = prizes;

    $scope.resetGame = function() {
        if (confirm('Are you sure? ')) {
            localStorageService.clearAll();
            localStorageService.set('data', alphabets);
            $scope.alphabets = localStorageService.get('data');
        }
    };

    if (localStorageService.isSupported) {
        console.log('localstorage is supported');
        //if no localstorage on key 'data'
        if (!localStorageService.get('data')) {
            localStorageService.set('data', alphabets);
        } else {
            $scope.alphabets = localStorageService.get('data');
            //console.log($scope.alphabets);
        }
    }

    $scope.change = function(index, entry) {
        console.log('value: ', index, entry);
        //save to localstorage
        save();
        $scope.checkResult();
    };


    var btnCheckResultClicked = false;

    //todo check group result
    function checkGroupResult(){

    }

    //if all in entries in a group are true
    $scope.checkResult = function() {

        //toggle alert message
        btnCheckResultClicked = !btnCheckResultClicked;

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
        localStorageService.set('data', $scope.alphabets);
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


});
