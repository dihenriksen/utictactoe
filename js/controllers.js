'use strict';

/* Controllers */

angular.module('utictactoe.controllers', []).
  controller('GameCtrl', [
  	'$scope',
  	'angularFire',
  	function($scope, angularFire) {
  		var url = 'http://utictactoe.firebaseio.com/gameboard';
  		var promise = angularFire(url, $scope, 'gameboard', {});
      $scope.moves = {};

  		$scope.myFunc = function() {
  		}

  		$scope.makeMove = function() {
        $scope.moves.space00 = 'X';
        console.log($scope.moves);
  		}

  		promise.then(function() {
  			$scope.$watch('gameboard', $scope.myFunc);
  		});
  	}
	]);



