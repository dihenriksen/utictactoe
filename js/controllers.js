'use strict';

/* Controllers */

angular.module('utictactoe.controllers', []).
  controller('GameCtrl', [
  	'$scope',
  	'angularFire',
  	function($scope, angularFire) {
  		var url = 'http://utictactoe.firebaseio.com/gameboard';
      var promiseGame
  		var promise = angularFire(url, $scope, 'gameboard', {'spaces': []});

  		$scope.myFunc = function() {
  		}

      var turn = true;

  		$scope.spaceSelect = function(i) {
        if ($scope.gameboard.spaces[i] === 'X' || $scope.gameboard.spaces[i] === 'O') {
          $scope.gameboard.spaces[i] = '';
        } else if (turn === true) {
          $scope.gameboard.spaces[i] = 'X';
        } else if (turn === false) {
          $scope.gameboard.spaces[i] = 'O';
        };
        turn = !turn;
        console.log($scope.gameboard.spaces);
      };

  		promise.then(function() {
  			$scope.$watch('gameboard', $scope.myFunc);
  		});
  	}
	]);



