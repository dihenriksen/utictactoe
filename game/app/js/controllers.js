'use strict';

/* Controllers */

angular.module('utictactoe.controllers', []).
  controller('GameCtrl', [
  	'$scope',
  	'angularFire',
  	function($scope, angularFire) {
  		var url = 'http://utictactoe.firebaseio.com/gameboard';
  		var promise = angularFire(url, $scope, 'gameboard', {'spaces': []});
      // console.log(gameboard);


      // gameboard.spaces = [];

  		$scope.myFunc = function() {
  		}

  		$scope.makeMove = function(i) {
        console.log(i);
        $scope.gameboard.spaces[i] = 'X';
        console.log($scope.gameboard.spaces[0]);
  		}

  		promise.then(function() {
  			$scope.$watch('board', $scope.myFunc);
        console.log($scope.gameboard);
  		});
  	}
	]);



