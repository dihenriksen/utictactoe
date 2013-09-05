'use strict';


// Declare app level module which depends on filters, and services
angular.module('utictactoe',
	[
		'firebase',
		'utictactoe.controllers',
		'ngCookies'
	]).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.when('/', {templateUrl: 'partials/game.html', controller: 'GameCtrl'});
	$routeProvider.when('/rules', {templateUrl: 'partials/rules.html', controller: 'RulesCtrl'});
}])