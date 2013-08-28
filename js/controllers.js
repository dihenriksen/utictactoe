'use strict';

/* Controllers */

angular.module('utictactoe.controllers', []).
  controller('GameCtrl', [
  	'$scope',
  	'angularFire',
  	function($scope, angularFire) {
  		var url = 'http://utictactoe.firebaseio.com/gameboard';
  		var promise = angularFire(url, $scope, 'gameboard', {'spaces': []});

  		$scope.myFunc = function() {
  		}

  		$scope.spaceSelect = function(i) {
        if ($scope.gameboard.spaces[i] === 'X' || $scope.gameboard.spaces[i] === 'O') {
          $scope.gameboard.spaces[i] = '';
        } else {
          $scope.gameboard.spaces[i] = 'X';
        };
      };

  		promise.then(function() {
  			$scope.$watch('gameboard', $scope.myFunc);
        console.log($scope.gameboard);
  		});
  	}
	]);



