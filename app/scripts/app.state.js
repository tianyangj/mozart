angular.module('lilybook').config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
	.state('app', {
		abstract: true,
		url: '',
		templateUrl: 'views/layout.html',
		controller: 'AppController',
		controllerAs: 'appCtrl'
	})
	.state('app.splash', {
		url: '/',
		templateUrl: 'views/pages/splash.html'
	})
	.state('app.home', {
		url: '/home',
		templateUrl: 'views/pages/splash.html'
	});

	$urlRouterProvider.otherwise('/');

});