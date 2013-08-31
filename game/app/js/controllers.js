'use strict';

/* Controllers */

angular.module('utictactoe.controllers', []).
  controller('GameCtrl', [
  	'$scope',
  	'angularFire',
  	function($scope, angularFire) {
  		var url = 'http://utictactoe.firebaseio.com/gameboard';
  		var promise = angularFire(url, $scope, 'gameboard', {'spaces': []});
      var enabled = [];
      var moves = [];
      for (var i = 0; i <= 88; i++) {
        enabled.push(i);
      }
      var turn = true;

  		$scope.myFunc = function() {
  		}

  		$scope.spaceSelect = function(i) {
        if (enabled.indexOf(i) != -1) {
          if (turn) {
            $scope.gameboard.spaces[i] = 'X';
          } else {
            $scope.gameboard.spaces[i] = 'O';
          }
          moves.push(i);
          enabled = [];
          $scope.enableSectors(i);
          turn = !turn;
        }
      };

      $scope.filledSector = function() {
        // This function is for use when a particular a player is sent to a
        // sector that is already full.
        // It returns arr, and the returned value should be assigned to 'enabled'
        // All squares other than those that have been played are allowed.
        console.log('Inside filledSector');
        var arr = [];
        for (var i = 0; i <= 88; i++) {
          if (moves.indexOf(i) == -1) {
            arr.push(i);
          }
        }
        $scope.disabled0 = 'all';
        $scope.disabled1 = 'all';
        $scope.disabled2 = 'all';
        $scope.disabled3 = 'all';
        $scope.disabled4 = 'all';
        $scope.disabled5 = 'all';
        $scope.disabled6 = 'all';
        $scope.disabled7 = 'all';
        $scope.disabled8 = 'all';
        $scope.disabled9 = 'all';
        return arr;
      }

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
            for (var i = 0; i <= 8; i++) {
              if (moves.indexOf(i) == -1) {
                enabled.push(i);
              }
            }
            console.log(enabled);
            if (enabled.length === 0) {
              enabled = $scope.filledSector();
            }
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
            for (var i = 10; i <= 18; i++) {
              if (moves.indexOf(i) == -1) {
                enabled.push(i);
              }
            }
            console.log(enabled);
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
            for (var i = 20; i <= 28; i++) {
              if (moves.indexOf(i) == -1) {
                enabled.push(i);
              }
            }
            console.log(enabled);
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
            for (var i = 30; i <= 38; i++) {
              if (moves.indexOf(i) == -1) {
                enabled.push(i);
              }
            }
            console.log(enabled);
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
            for (var i = 40; i <= 48; i++) {
              if (moves.indexOf(i) == -1) {
                enabled.push(i);
              }
            }
            console.log(enabled.length === 0);
            if (enabled.length === 0) {
              enabled = $scope.filledSector();
            }
            console.log(enabled);
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
            for (var i = 50; i <= 58; i++) {
              if (moves.indexOf(i) == -1) {
                enabled.push(i);
              }
            }
            console.log(enabled);
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
            for (var i = 60; i <= 68; i++) {
              if (moves.indexOf(i) == -1) {
                enabled.push(i);
              }
            }
            console.log(enabled);
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
            for (var i = 70; i <= 78; i++) {
              if (moves.indexOf(i) == -1) {
                enabled.push(i);
              }
            }
            console.log(enabled);
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
            for (var i = 80; i <= 88; i++) {
              if (moves.indexOf(i) == -1) {
                enabled.push(i);
              }
            }
            console.log(enabled);
            break
        }
      }

      $scope.newgame = function() {
        enabled = [];
        for (var i = 0; i <= 88; i++) {
          enabled.push(i);
        }
        $scope.allEnabled = true;
        moves = [];
        for (var space in $scope.gameboard.spaces) {
          $scope.gameboard.spaces[space] = '';
        }
        $scope.disabled0 = 'all';
        $scope.disabled1 = 'all';
        $scope.disabled2 = 'all';
        $scope.disabled3 = 'all';
        $scope.disabled4 = 'all';
        $scope.disabled5 = 'all';
        $scope.disabled6 = 'all';
        $scope.disabled7 = 'all';
        $scope.disabled8 = 'all';
        $scope.disabled9 = 'all';
      }

  		promise.then(function() {
  			$scope.$watch('gameboard');
  		});
  	}
	]);



