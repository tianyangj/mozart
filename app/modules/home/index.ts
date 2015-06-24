module lilybook.home {
	'use strict';

	export var module = angular.module('lilybook.home', [
		'ngMaterial',
        'ui.router'
	]);

	module.config(($stateProvider) => {
		$stateProvider
			.state('app.home', {
				url: '/home',
				templateUrl: 'modules/home/views/home.html'
			});
	});
}