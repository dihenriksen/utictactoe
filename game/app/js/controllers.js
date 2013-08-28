'use strict';

/* Controllers */

angular.module('utictactoe.controllers', []).
  controller('GameCtrl', [
  	'$scope',
  	'angularFire',
  	function($scope, angularFire) {
  		var url = 'http://utictactoe.firebaseio.com/gameboard';
  		var promise = angularFire(url, $scope, 'gameboard', { game: 'XOX' });

  		$scope.myFunc = function() {
  		}

  		$scope.makeMove = function() {
  			console.log('makeMove called');
  			var space00 = 'X';
  			return space00;
  		}

  		promise.then(function() {
  			$scope.$watch('gameboard', $scope.myFunc);
  		});
  	}
	]);



