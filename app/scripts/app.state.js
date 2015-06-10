angular.module('lilybook').config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('app', {
		abstract: true,
		url: '',
		templateUrl: 'views/layout.html'
	})
	.state('app.splash', {
		url: '/',
		templateUrl: 'views/pages/splash.html'
	});

	$urlRouterProvider.otherwise('/');

});