/* global Parse */

angular.module('lilybook').run(function ($rootScope, $state, $stateParams) {

	Parse.initialize('fHO4LtJRfsdhQBBicYZpdpj3BQHHQCVEiDPkS4ZI', '3gzRyAZnxtQLn1IofC4Layn6cc487e4n5Jin6FzM');
	
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
});