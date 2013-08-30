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

      var turn = true;

  		$scope.spaceSelect = function(i) {
        if ($scope.gameboard.spaces[i] === 'X' || $scope.gameboard.spaces[i] === 'O') {
          $scope.gameboard.spaces[i] = '';
        } else if (turn === true) {
          $scope.gameboard.spaces[i] = 'X';
        } else if (turn === false) {
          $scope.gameboard.spaces[i] = 'O';
        };
        $scope.enableSectors(i);
        turn = !turn;
      };

      $scope.enableSectors = function(i) {
        switch (i) {
          case 0: case 10: case 20: case 30: case 40: case 50: case 60: case 70: case 80:
            $scope.disabled0 = false;
            $scope.disabled1 = true;
            $scope.disabled2 = true;
            $scope.disabled3 = true;
            $scope.disabled4 = true;
            $scope.disabled5 = true;
            $scope.disabled6 = true;
            $scope.disabled7 = true;
            $scope.disabled8 = true;
            break
          case 1: case 11: case 21: case 31: case 41: case 51: case 61: case 71: case 81:
            $scope.disabled0 = true;
            $scope.disabled1 = false;
            $scope.disabled2 = true;
            $scope.disabled3 = true;
            $scope.disabled4 = true;
            $scope.disabled5 = true;
            $scope.disabled6 = true;
            $scope.disabled7 = true;
            $scope.disabled8 = true;
            break
          case 2: case 12: case 22: case 32: case 42: case 52: case 62: case 72: case 82:
            $scope.disabled0 = true;
            $scope.disabled1 = true;
            $scope.disabled2 = false;
            $scope.disabled3 = true;
            $scope.disabled4 = true;
            $scope.disabled5 = true;
            $scope.disabled6 = true;
            $scope.disabled7 = true;
            $scope.disabled8 = true;
            break
          case 3: case 13: case 23: case 33: case 43: case 53: case 63: case 73: case 83:
            $scope.disabled0 = true;
            $scope.disabled1 = true;
            $scope.disabled2 = true;
            $scope.disabled3 = false;
            $scope.disabled4 = true;
            $scope.disabled5 = true;
            $scope.disabled6 = true;
            $scope.disabled7 = true;
            $scope.disabled8 = true;
            break
          case 4: case 14: case 24: case 34: case 44: case 54: case 64: case 74: case 84:
            $scope.disabled0 = true;
            $scope.disabled1 = true;
            $scope.disabled2 = true;
            $scope.disabled3 = true;
            $scope.disabled4 = false;
            $scope.disabled5 = true;
            $scope.disabled6 = true;
            $scope.disabled7 = true;
            $scope.disabled8 = true;
            break
          case 5: case 15: case 25: case 35: case 45: case 55: case 65: case 75: case 85:
            $scope.disabled0 = true;
            $scope.disabled1 = true;
            $scope.disabled2 = true;
            $scope.disabled3 = true;
            $scope.disabled4 = true;
            $scope.disabled5 = false;
            $scope.disabled6 = true;
            $scope.disabled7 = true;
            $scope.disabled8 = true;
            break
          case 6: case 16: case 26: case 36: case 46: case 56: case 66: case 76: case 86:
            $scope.disabled0 = true;
            $scope.disabled1 = true;
            $scope.disabled2 = true;
            $scope.disabled3 = true;
            $scope.disabled4 = true;
            $scope.disabled5 = true;
            $scope.disabled6 = false;
            $scope.disabled7 = true;
            $scope.disabled8 = true;
            break
          case 7: case 17: case 27: case 37: case 47: case 57: case 67: case 77: case 87:
            $scope.disabled0 = true;
            $scope.disabled1 = true;
            $scope.disabled2 = true;
            $scope.disabled3 = true;
            $scope.disabled4 = true;
            $scope.disabled5 = true;
            $scope.disabled6 = true;
            $scope.disabled7 = false;
            $scope.disabled8 = true;
            break
          case 8: case 18: case 28: case 38: case 48: case 58: case 68: case 78: case 88:
            $scope.disabled0 = true;
            $scope.disabled1 = true;
            $scope.disabled2 = true;
            $scope.disabled3 = true;
            $scope.disabled4 = true;
            $scope.disabled5 = true;
            $scope.disabled6 = true;
            $scope.disabled7 = true;
            $scope.disabled8 = false;
            break
        }
      }

  		promise.then(function() {
  			$scope.$watch('gameboard');
  		});
  	}
	])
  .controller('NewGameCtrl', [
    '$scope',
    'angularFire',
    function($scope, angularFire) {
      var url = 'http://utictactoe.firebaseio.com/gameboard';
      var promise = angularFire(url, $scope, 'gameboard', {});

      $scope.newgame = function() {
        for (var space in $scope.gameboard.spaces) {
          $scope.gameboard.spaces[space] = '';
        }
        $scope.disabled0 = false;
        $scope.disabled1 = false;
        $scope.disabled2 = false;
        $scope.disabled3 = false;
        $scope.disabled4 = false;
        $scope.disabled5 = false;
        $scope.disabled6 = false;
        $scope.disabled7 = false;
        $scope.disabled8 = false;
        $scope.disabled9 = false;
        console.log($scope.disabled0);
      }

      promise.then(function() {
        $scope.$watch('gameboard');
      })
    }
  ])



