'use strict';

/* Controllers */


// Refactoring:
// 1. user ng-repeat to generate board
// 2. eliminate moves array - use spaces instead
// 3. eliminate local turn variable

angular.module('utictactoe.controllers', []).
  controller('GameCtrl', [
  	'$scope',
  	'angularFire',
    '$cookies',
  	function($scope, angularFire, $cookies) {
  		var url = 'http://utictactoe.firebaseio.com/gameboard';
  		var promise = angularFire(url, $scope, 'gameboard', {});
      var turn = null;


      // This function makes a move on the board.
  		$scope.spaceSelect = function(i) {
        if (turn === null && $scope.gameboard.moves[0] === -1) {
          turn = true;
        } else if (turn === null) {
          turn = false;
        }

        if (turn === $scope.gameboard.turn) {
          if ($scope.gameboard.enabled.indexOf(i) != -1) {
            if ($scope.gameboard.turn) {
              $scope.gameboard.spaces[i] = 'X';
            } else {
              $scope.gameboard.spaces[i] = 'O';
            }
            if ($scope.gameboard.moves[0] === -1) {
              $scope.gameboard.moves[0] = i;
            } else {
              $scope.gameboard.moves.push(i);
            }

            $scope.checkSector(i, turn);

            $scope.gameboard.enabled = [];
            $scope.showEnabledSectors(i);
            $scope.setEnabled(i);
            $scope.gameboard.turn = !$scope.gameboard.turn;
          }
        }

      };


      $scope.checkSector = function(i, turn) {
        var s = Math.floor(i/10)*10;

        if ($scope.gameboard.result[s/10] === '') {
          if ($scope.doChecking(s, s+1, s+2)) {}
          else if ($scope.doChecking(s+3, s+4, s+5)) {}
          else if ($scope.doChecking(s+6, s+7, s+8)) {}
          else if ($scope.doChecking(s, s+4, s+8)) {}
          else if ($scope.doChecking(s+2, s+4, s+6)) {}
          else if ($scope.doChecking(s, s+3, s+6)) {}
          else if ($scope.doChecking(s+1, s+4, s+7)) {}
          else { $scope.doChecking(s+2, s+5, s+8) }
        }

        console.log($scope.gameboard.result);
      }


      $scope.doChecking = function(a, b, c) {
        var s = Math.floor(a/10);
        if ($scope.gameboard.spaces[a] === 'X' && $scope.gameboard.spaces[b] === 'X' && $scope.gameboard.spaces[c] === 'X') {
          $scope.gameboard.result[s] = 'X';
          return true;
        } else if ($scope.gameboard.spaces[a] === 'O' && $scope.gameboard.spaces[b] === 'O' && $scope.gameboard.spaces[c] === 'O') {
          $scope.gameboard.result[s] = 'O';
          return true;
        }
      }


      //controls the squares that are enabled, sending data to firebase
      $scope.setEnabled = function(k) {
        // k will in general be a square that is clicked.
        // if it is to start a game, k should be set to -1 when calling setEnabled
        switch (k) {
          // starting a new game:
          case -1:
            for (var i = 0; i <= 88; i++) {
              $scope.gameboard.enabled.push(i);
            }
            break
          case 0: case 10: case 20: case 30: case 40: case 50: case 60: case 70: case 80:
            $scope.doEnabling(0,8);
            break
          case 1: case 11: case 21: case 31: case 41: case 51: case 61: case 71: case 81:
            $scope.doEnabling(10,18);
            break
          case 2: case 12: case 22: case 32: case 42: case 52: case 62: case 72: case 82:
            $scope.doEnabling(20,28);
            break
          case 3: case 13: case 23: case 33: case 43: case 53: case 63: case 73: case 83:
            $scope.doEnabling(30,38);
            break
          case 4: case 14: case 24: case 34: case 44: case 54: case 64: case 74: case 84:
            $scope.doEnabling(40,48);
            break
          case 5: case 15: case 25: case 35: case 45: case 55: case 65: case 75: case 85:
            $scope.doEnabling(50,58);
            break
          case 6: case 16: case 26: case 36: case 46: case 56: case 66: case 76: case 86:
            $scope.doEnabling(60,68);
            break
          case 7: case 17: case 27: case 37: case 47: case 57: case 67: case 77: case 87:
            $scope.doEnabling(70,78);
            break
          case 8: case 18: case 28: case 38: case 48: case 58: case 68: case 78: case 88:
            $scope.doEnabling(80,88);
            break
        }
      }

      // a function that does the actual enabling
      // it should only be called from within $scope.setEnabled
      $scope.doEnabling = function(low, high) {
        for (var i = low; i <= high; i++) {
          if ($scope.gameboard.moves.indexOf(i) == -1) {
            $scope.gameboard.enabled.push(i);
          }
        }
        // Player sent to an already filled sector:
        if ($scope.gameboard.enabled.length === 0) {
          $scope.gameboard.enabled = $scope.filledSector();
        }
      }

      $scope.filledSector = function() {
        // This function is for use when a player is sent to a
        // sector that is already full.
        // It returns arr, and the returned value should be assigned to 'gameboard.enabled'
        // All squares other than those that have been played on are allowed.
        var arr = [];
        for (var i = 0; i <= 88; i++) {
          if ($scope.gameboard.moves.indexOf(i) == -1) {
            arr.push(i);
          }
        }
        $scope.gameboard.disabledSects[0] = 'all';$scope.gameboard.disabledSects[1] = 'all';$scope.gameboard.disabledSects[2] = 'all';$scope.gameboard.disabledSects[3] = 'all';$scope.gameboard.disabledSects[4] = 'all';$scope.gameboard.disabledSects[5] = 'all';$scope.gameboard.disabledSects[6] = 'all';$scope.gameboard.disabledSects[7] = 'all';$scope.gameboard.disabledSects[8] = 'all';
        return arr;
      }

      // enable proper sectors after a turn
      $scope.showEnabledSectors = function(i) {
        switch (i) {
          case 0: case 10: case 20: case 30: case 40: case 50: case 60: case 70: case 80:
            $scope.gameboard.disabledSects[0] = false;$scope.gameboard.disabledSects[1] = true;$scope.gameboard.disabledSects[2] = true;$scope.gameboard.disabledSects[3] = true;$scope.gameboard.disabledSects[4] = true;$scope.gameboard.disabledSects[5] = true;$scope.gameboard.disabledSects[6] = true;$scope.gameboard.disabledSects[7] = true;$scope.gameboard.disabledSects[8] = true;
            break
          case 1: case 11: case 21: case 31: case 41: case 51: case 61: case 71: case 81:
            $scope.gameboard.disabledSects[0] = true;$scope.gameboard.disabledSects[1] = false;$scope.gameboard.disabledSects[2] = true;$scope.gameboard.disabledSects[3] = true;$scope.gameboard.disabledSects[4] = true;$scope.gameboard.disabledSects[5] = true;$scope.gameboard.disabledSects[6] = true;$scope.gameboard.disabledSects[7] = true;$scope.gameboard.disabledSects[8] = true;
            break
          case 2: case 12: case 22: case 32: case 42: case 52: case 62: case 72: case 82:
            $scope.gameboard.disabledSects[0] = true;$scope.gameboard.disabledSects[1] = true;$scope.gameboard.disabledSects[2] = false;$scope.gameboard.disabledSects[3] = true;$scope.gameboard.disabledSects[4] = true;$scope.gameboard.disabledSects[5] = true;$scope.gameboard.disabledSects[6] = true;$scope.gameboard.disabledSects[7] = true;$scope.gameboard.disabledSects[8] = true;
            break
          case 3: case 13: case 23: case 33: case 43: case 53: case 63: case 73: case 83:
            $scope.gameboard.disabledSects[0] = true;$scope.gameboard.disabledSects[1] = true;$scope.gameboard.disabledSects[2] = true;$scope.gameboard.disabledSects[3] = false;$scope.gameboard.disabledSects[4] = true;$scope.gameboard.disabledSects[5] = true;$scope.gameboard.disabledSects[6] = true;$scope.gameboard.disabledSects[7] = true;$scope.gameboard.disabledSects[8] = true;
            break
          case 4: case 14: case 24: case 34: case 44: case 54: case 64: case 74: case 84:
            $scope.gameboard.disabledSects[0] = true;$scope.gameboard.disabledSects[1] = true;$scope.gameboard.disabledSects[2] = true;$scope.gameboard.disabledSects[3] = true;$scope.gameboard.disabledSects[4] = false;$scope.gameboard.disabledSects[5] = true;$scope.gameboard.disabledSects[6] = true;$scope.gameboard.disabledSects[7] = true;$scope.gameboard.disabledSects[8] = true;
            break
          case 5: case 15: case 25: case 35: case 45: case 55: case 65: case 75: case 85:
            $scope.gameboard.disabledSects[0] = true;$scope.gameboard.disabledSects[1] = true;$scope.gameboard.disabledSects[2] = true;$scope.gameboard.disabledSects[3] = true;$scope.gameboard.disabledSects[4] = true;$scope.gameboard.disabledSects[5] = false;$scope.gameboard.disabledSects[6] = true;$scope.gameboard.disabledSects[7] = true;$scope.gameboard.disabledSects[8] = true;
            break
          case 6: case 16: case 26: case 36: case 46: case 56: case 66: case 76: case 86:
            $scope.gameboard.disabledSects[0] = true;$scope.gameboard.disabledSects[1] = true;$scope.gameboard.disabledSects[2] = true;$scope.gameboard.disabledSects[3] = true;$scope.gameboard.disabledSects[4] = true;$scope.gameboard.disabledSects[5] = true;$scope.gameboard.disabledSects[6] = false;$scope.gameboard.disabledSects[7] = true;$scope.gameboard.disabledSects[8] = true;
            break
          case 7: case 17: case 27: case 37: case 47: case 57: case 67: case 77: case 87:
            $scope.gameboard.disabledSects[0] = true;$scope.gameboard.disabledSects[1] = true;$scope.gameboard.disabledSects[2] = true;$scope.gameboard.disabledSects[3] = true;$scope.gameboard.disabledSects[4] = true;$scope.gameboard.disabledSects[5] = true;$scope.gameboard.disabledSects[6] = true;$scope.gameboard.disabledSects[7] = false;$scope.gameboard.disabledSects[8] = true;
            break
          case 8: case 18: case 28: case 38: case 48: case 58: case 68: case 78: case 88:
            $scope.gameboard.disabledSects[0] = true;$scope.gameboard.disabledSects[1] = true;$scope.gameboard.disabledSects[2] = true;$scope.gameboard.disabledSects[3] = true;$scope.gameboard.disabledSects[4] = true;$scope.gameboard.disabledSects[5] = true;$scope.gameboard.disabledSects[6] = true;$scope.gameboard.disabledSects[7] = true;$scope.gameboard.disabledSects[8] = false;
            break
        }
      }

      $scope.turnDisplay = function() {
        console.log('Inside turnDisplay');
        $scope.turnInfo = 'Your turn';
      }

      //reset conditions for a new game
      $scope.newgame = function() {
        // moves array stores which places have been played in
        $scope.gameboard.moves = [-1];

        // turn = true means it is X's turn
        // turn = false means it is O's turn
        $scope.gameboard.turn = true;

        // spaces array stores an X, O, or empty string for each place
        $scope.gameboard.spaces = [];
        for (var i = 0; i <= 88; i++) {
          $scope.gameboard.spaces[i] = '';
        }

        $scope.gameboard.enabled = [];
        $scope.setEnabled(-1);

        $scope.gameboard.disabledSects = [];
        $scope.gameboard.disabledSects[0] = 'all';$scope.gameboard.disabledSects[1] = 'all';$scope.gameboard.disabledSects[2] = 'all';$scope.gameboard.disabledSects[3] = 'all';$scope.gameboard.disabledSects[4] = 'all';$scope.gameboard.disabledSects[5] = 'all';$scope.gameboard.disabledSects[6] = 'all';$scope.gameboard.disabledSects[7] = 'all';$scope.gameboard.disabledSects[8] = 'all';

        $scope.gameboard.result = ['','','','','','','','',''];
      }

  		promise.then(function() {
  			$scope.$watch('gameboard');
        // $cookies.username = 'Damien';
        // $cookies.turn = true;
        console.log($cookies);
  		});
  	}
	]);



