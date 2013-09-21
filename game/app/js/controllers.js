'use strict';

/* Controllers */


// Refactoring:
// 1. user ng-repeat to generate board
// 2. eliminate moves array - use spaces instead
// 3. eliminate local turn variable
// 4. make each space an object, with properties like when they were played, value, etc.

angular.module('utictactoe.controllers', [])

  .controller('PlayersCtrl', [
    '$scope',
    'angularFire',
    '$cookies',
    '$cookieStore',
    function($scope, angularFire, $cookies) {
      var test = 0;
      var ref = new Firebase('https://utictactoe.firebaseio.com/players');
      var promise = angularFire(ref, $scope, 'players', {});

      promise.then(function() {

        if (typeof($cookies.playerId) === 'undefined') {
          // playerId created uniquely by Firebase as a consequence of the push command
          var playerId = ref.push({
            wins: 0,
            losses: 0,
            ties: 0,
            inProgress: null
          });
          $cookies.playerId = playerId.name();
        }
      });
    }])


  .controller('GameCtrl', [
  	'$scope',
  	'angularFire',
    '$cookies',
    '$cookieStore',
  	function($scope, angularFire, $cookies, $cookieStore) {
      var gamescope = null;
      var game = null;

      if (typeof($cookies['inProgress']) !== 'undefined' && $cookies['inProgress'] !== 'none') {
        game = $cookies['inProgress'];
        var ref = new Firebase('https://utictactoe.firebaseio.com/games/' + game + '/gameboard');
        var promise = angularFire(ref, $scope, 'gameboard', {});

        promise.then(function() {
          $scope.$watch('gameboard');
          gamescope = $scope;
          if (gamescope.gameboard.inProgress === false) {
            alert('You won');
            $cookieStore.remove('inProgress');
          }
        })
      }

      var turn = null;
      var turnTest = true; //for testing purposes only

      //mySer.obj = $scope.gameboard
      // This function makes a move on the board.
  		$scope.spaceSelect = function(i) {

        // This section should only be enabled when testing the application.
        // It allows play in one window.
      //   if ($scope.gameboard.enabled.indexOf(i) != -1) {
      //     if (turnTest) {
      //       $scope.gameboard.spaces[i] = 'X';
      //     } else {
      //       $scope.gameboard.spaces[i] = 'O';
      //     }
      //     if ($scope.gameboard.moves[0] === -1) {
      //       $scope.gameboard.moves[0] = i;
      //     } else {
      //       $scope.gameboard.moves.push(i);
      //     }

      //     $scope.checkSector(i);
      //     if ($scope.gameboard.moves.length >= 18) {
      //       $scope.checkWin();
      //       if ($scope.gameboard.winner === true) {
      //         alert('X Wins!');
      //       } else if ($scope.gameboard.winner === false) {
      //         alert('O Wins!')
      //       } else if ($scope.gameboard.moves.length === 81) {
      //         alert('It\'s a tie!')
      //       }
      //     }

      //     $scope.gameboard.enabled = [];
      //     $scope.showEnabledSectors(i);
      //     $scope.setEnabled(i);
      //     turnTest = !turnTest;
      //   }
      // };






        // The real code
        if ($cookies['turn'] === 'true') {
          turn = true;
        } else if ($cookies['turn'] === 'false') {
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

            $scope.checkSector(i);
            if ($scope.gameboard.moves.length >= 18) {
              $scope.checkWin();
              if ($scope.gameboard.winner === true) {
                alert('X Wins!');
              } else if ($scope.gameboard.winner === false) {
                alert('O Wins!');
              } else if ($scope.gameboard.moves.length === 81) {
                alert('It\'s a tie!');
              }
            }

            $scope.gameboard.enabled = [];
            $scope.showEnabledSectors(i);
            $scope.setEnabled(i);
            $scope.gameboard.turn = !$scope.gameboard.turn;
          }
        }
      };


      $scope.checkWin = function() {
        if ($scope.doWinChecking(0, 1, 2)) {}
        else if ($scope.doWinChecking(3, 4, 5)) {}
        else if ($scope.doWinChecking(6, 7, 8)) {}
        else if ($scope.doWinChecking(0, 4, 8)) {}
        else if ($scope.doWinChecking(2, 4, 6)) {}
        else if ($scope.doWinChecking(0, 3, 6)) {}
        else if ($scope.doWinChecking(1, 4, 7)) {}
        else { $scope.doWinChecking(2, 5, 8) }
      }


      $scope.doWinChecking = function(a, b, c) {
        if ($scope.gameboard.result[a] === 'X' && $scope.gameboard.result[b] === 'X' && $scope.gameboard.result[c] === 'X') {
          console.log($scope.gameboard.result);
          $scope.gameboard.winner = true;
        } else if ($scope.gameboard.result[a] === 'O' && $scope.gameboard.result[b] === 'O' && $scope.gameboard.result[c] === 'O') {
          console.log($scope.gameboard.result);
          $scope.gameboard.winner = false;
        }
      }


      $scope.checkSector = function(i) {
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
      }


      $scope.doChecking = function(a, b, c) {
        var s = Math.floor(a/10);
        if ($scope.gameboard.spaces[a] === 'X' && $scope.gameboard.spaces[b] === 'X' && $scope.gameboard.spaces[c] === 'X') {
          $scope.gameboard.result[s] = 'X';
          $scope.gameboard.xshow[s] = true;
          return true;
        } else if ($scope.gameboard.spaces[a] === 'O' && $scope.gameboard.spaces[b] === 'O' && $scope.gameboard.spaces[c] === 'O') {
          $scope.gameboard.result[s] = 'O';
          $scope.gameboard.oshow[s] = true;
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
        $scope.gameboard.disabledSectors[0] = 'all';$scope.gameboard.disabledSectors[1] = 'all';$scope.gameboard.disabledSectors[2] = 'all';$scope.gameboard.disabledSectors[3] = 'all';$scope.gameboard.disabledSectors[4] = 'all';$scope.gameboard.disabledSectors[5] = 'all';$scope.gameboard.disabledSectors[6] = 'all';$scope.gameboard.disabledSectors[7] = 'all';$scope.gameboard.disabledSectors[8] = 'all';
        return arr;
      }


      // enable proper sectors after a turn
      $scope.showEnabledSectors = function(i) {
        switch (i) {
          case 0: case 10: case 20: case 30: case 40: case 50: case 60: case 70: case 80:
            $scope.gameboard.disabledSectors[0] = false;$scope.gameboard.disabledSectors[1] = true;$scope.gameboard.disabledSectors[2] = true;$scope.gameboard.disabledSectors[3] = true;$scope.gameboard.disabledSectors[4] = true;$scope.gameboard.disabledSectors[5] = true;$scope.gameboard.disabledSectors[6] = true;$scope.gameboard.disabledSectors[7] = true;$scope.gameboard.disabledSectors[8] = true;
            break
          case 1: case 11: case 21: case 31: case 41: case 51: case 61: case 71: case 81:
            $scope.gameboard.disabledSectors[0] = true;$scope.gameboard.disabledSectors[1] = false;$scope.gameboard.disabledSectors[2] = true;$scope.gameboard.disabledSectors[3] = true;$scope.gameboard.disabledSectors[4] = true;$scope.gameboard.disabledSectors[5] = true;$scope.gameboard.disabledSectors[6] = true;$scope.gameboard.disabledSectors[7] = true;$scope.gameboard.disabledSectors[8] = true;
            break
          case 2: case 12: case 22: case 32: case 42: case 52: case 62: case 72: case 82:
            $scope.gameboard.disabledSectors[0] = true;$scope.gameboard.disabledSectors[1] = true;$scope.gameboard.disabledSectors[2] = false;$scope.gameboard.disabledSectors[3] = true;$scope.gameboard.disabledSectors[4] = true;$scope.gameboard.disabledSectors[5] = true;$scope.gameboard.disabledSectors[6] = true;$scope.gameboard.disabledSectors[7] = true;$scope.gameboard.disabledSectors[8] = true;
            break
          case 3: case 13: case 23: case 33: case 43: case 53: case 63: case 73: case 83:
            $scope.gameboard.disabledSectors[0] = true;$scope.gameboard.disabledSectors[1] = true;$scope.gameboard.disabledSectors[2] = true;$scope.gameboard.disabledSectors[3] = false;$scope.gameboard.disabledSectors[4] = true;$scope.gameboard.disabledSectors[5] = true;$scope.gameboard.disabledSectors[6] = true;$scope.gameboard.disabledSectors[7] = true;$scope.gameboard.disabledSectors[8] = true;
            break
          case 4: case 14: case 24: case 34: case 44: case 54: case 64: case 74: case 84:
            $scope.gameboard.disabledSectors[0] = true;$scope.gameboard.disabledSectors[1] = true;$scope.gameboard.disabledSectors[2] = true;$scope.gameboard.disabledSectors[3] = true;$scope.gameboard.disabledSectors[4] = false;$scope.gameboard.disabledSectors[5] = true;$scope.gameboard.disabledSectors[6] = true;$scope.gameboard.disabledSectors[7] = true;$scope.gameboard.disabledSectors[8] = true;
            break
          case 5: case 15: case 25: case 35: case 45: case 55: case 65: case 75: case 85:
            $scope.gameboard.disabledSectors[0] = true;$scope.gameboard.disabledSectors[1] = true;$scope.gameboard.disabledSectors[2] = true;$scope.gameboard.disabledSectors[3] = true;$scope.gameboard.disabledSectors[4] = true;$scope.gameboard.disabledSectors[5] = false;$scope.gameboard.disabledSectors[6] = true;$scope.gameboard.disabledSectors[7] = true;$scope.gameboard.disabledSectors[8] = true;
            break
          case 6: case 16: case 26: case 36: case 46: case 56: case 66: case 76: case 86:
            $scope.gameboard.disabledSectors[0] = true;$scope.gameboard.disabledSectors[1] = true;$scope.gameboard.disabledSectors[2] = true;$scope.gameboard.disabledSectors[3] = true;$scope.gameboard.disabledSectors[4] = true;$scope.gameboard.disabledSectors[5] = true;$scope.gameboard.disabledSectors[6] = false;$scope.gameboard.disabledSectors[7] = true;$scope.gameboard.disabledSectors[8] = true;
            break
          case 7: case 17: case 27: case 37: case 47: case 57: case 67: case 77: case 87:
            $scope.gameboard.disabledSectors[0] = true;$scope.gameboard.disabledSectors[1] = true;$scope.gameboard.disabledSectors[2] = true;$scope.gameboard.disabledSectors[3] = true;$scope.gameboard.disabledSectors[4] = true;$scope.gameboard.disabledSectors[5] = true;$scope.gameboard.disabledSectors[6] = true;$scope.gameboard.disabledSectors[7] = false;$scope.gameboard.disabledSectors[8] = true;
            break
          case 8: case 18: case 28: case 38: case 48: case 58: case 68: case 78: case 88:
            $scope.gameboard.disabledSectors[0] = true;$scope.gameboard.disabledSectors[1] = true;$scope.gameboard.disabledSectors[2] = true;$scope.gameboard.disabledSectors[3] = true;$scope.gameboard.disabledSectors[4] = true;$scope.gameboard.disabledSectors[5] = true;$scope.gameboard.disabledSectors[6] = true;$scope.gameboard.disabledSectors[7] = true;$scope.gameboard.disabledSectors[8] = false;
            break
        }
      }


      $scope.turnDisplay = function() {
        console.log('Inside turnDisplay');
        $scope.turnInfo = 'Your turn';
      }


      $scope.resign = function(game) {
        if (($scope.gameboard.winner = !$scope.gameboard.turn) === true) {
          alert('X Wins!');
        } else { alert('O Wins!') }

        $scope.gameboard.enabled = [-1];
        $scope.gameboard.disabledSectors[0] = true;$scope.gameboard.disabledSectors[1] = true;$scope.gameboard.disabledSectors[2] = true;$scope.gameboard.disabledSectors[3] = true;$scope.gameboard.disabledSectors[4] = true;$scope.gameboard.disabledSectors[5] = true;$scope.gameboard.disabledSectors[6] = true;$scope.gameboard.disabledSectors[7] = true;$scope.gameboard.disabledSectors[8] = true;
        $scope.gameboard.inProgress = false;
        $cookieStore.remove('inProgress');
      }


      //reset conditions for a new game
      $scope.startGame = function(game) {
        var ref = new Firebase('https://utictactoe.firebaseio.com/games/' + game + '/gameboard')
        var promise = angularFire(ref, $scope, 'gameboard', {});
        gamescope = $scope;
        $scope.setNewBoard(game);

        promise.then(function() {
          gamescope = $scope;
          $scope.$watch('gameboard');
          // $scope.setNewBoard(game);
        })
      }


      $scope.startGame1 = function(game) {
        var ref = new Firebase('https://utictactoe.firebaseio.com/games/' + game + '/gameboard')
        var promise = angularFire(ref, $scope, 'gameboard', {});

        promise.then(function(result) {
          // console.log(ref.toString());
          $scope.$watch('gameboard');
          gamescope = $scope;
        })
      }


      $scope.setNewBoard = function(game) {
        console.log('here');

        // the 'moves' array stores which spaces have been played in
        $scope.gameboard.moves = [-1];

        // turn = true means it is X's turn
        // turn = false means it is O's turn
        $scope.gameboard.turn = true;

        // spaces array stores an X, O, or empty string for each space
        $scope.gameboard.spaces = [];
        for (var i = 0; i <= 88; i++) {
          $scope.gameboard.spaces[i] = '';
        }

        // stores which spaces a player may play in
        $scope.gameboard.enabled = [];
        $scope.setEnabled(-1);

        // for controlling the css of enabled and disabled sectors
        $scope.gameboard.disabledSectors = [];
        $scope.gameboard.disabledSectors[0] = 'all';$scope.gameboard.disabledSectors[1] = 'all';$scope.gameboard.disabledSectors[2] = 'all';$scope.gameboard.disabledSectors[3] = 'all';$scope.gameboard.disabledSectors[4] = 'all';$scope.gameboard.disabledSectors[5] = 'all';$scope.gameboard.disabledSectors[6] = 'all';$scope.gameboard.disabledSectors[7] = 'all';$scope.gameboard.disabledSectors[8] = 'all';

        $scope.gameboard.result = ['','','','','','','','',''];
        $scope.gameboard.xshow = [false, false, false, false, false, false, false, false, false];
        $scope.gameboard.oshow = [false, false, false, false, false, false, false, false, false];
        $scope.gameboard.winner = null;
        $scope.gameboard.inProgress = true;
      }


      $scope.clearcookie = function() {
        $cookieStore.remove('inProgress');
        $cookieStore.remove('turn');
      }


      $scope.showcookie = function() {
        console.log('');
        console.log('In progress: ' + $cookies['inProgress']);
        console.log('Whose turn:' + $cookies['turn']);
        console.log(typeof $cookies['turn']);
        console.log('This player: ' + $cookies['playerId']);
      }


      $scope.newgame = function() {
        var playerId = $cookies['playerId'];


        if ($cookieStore.get('inProgress') === 'none' || typeof $cookies.inProgress === 'undefined') {
          var queue = new Firebase('https://utictactoe.firebaseio.com/queue');
          queue.once('value', function(data) {
            if (data.val() === null) {
              game = queue.parent().child('games').push({
                player1: playerId
              }).name();
              queue.set(game);
              $scope.gameboard = {};
              var ref = new Firebase('https://utictactoe.firebaseio.com/games/' + game + '/gameboard');
              angularFire(ref, $scope, 'gameboard', {}).then(function() {
                $cookieStore.put('turn', true);
                $cookieStore.put('inProgress', game);
                // var endGameRef = new Firebase('https://utictactoe.firebaseio.com/games/' + game + '/gameboard');
                // endGameRef.once('child_added', function(data) {
                //   console.log('the game is over');
                // })
              })
            } else {
              game = data.val();
              queue.remove();
              queue.parent().child('games').child(game).child('player2').set(playerId);
              $scope.gameboard = {};
              var ref = new Firebase('https://utictactoe.firebaseio.com/games/' + game + '/gameboard');
              angularFire(ref, $scope, 'gameboard', {}).then(function() {
                $cookieStore.put('turn', false);
                $cookieStore.put('inProgress', game);
                $scope.setNewBoard(game);
              })
            }

            // Erase data in cookies pertaining to current game when someone resigns
            var endGameRef = new Firebase('https://utictactoe.firebaseio.com/games/' + game + '/gameboard/winner');
            endGameRef.on('value', function(data) {
              console.log(data.val());
            })
          })
        }
      }
  	}])

  .controller('RulesCtrl', [
    '$scope',
    function(){

    }])


