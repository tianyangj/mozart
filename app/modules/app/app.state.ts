module lilybook.app {
	'use strict';

	module.config(($stateProvider, $urlRouterProvider) => {

		$stateProvider
			.state('app', {
				abstract: true,
				url: '',
				templateUrl: 'layout-web.html',
				controller: 'AppController',
				controllerAs: 'appCtrl'
			})
			.state('app.splash', {
				url: '/',
				views: {
					'toolbar': { template: '<h2>Splash</h2>' },
					'': { templateUrl: 'modules/app/views/splash.html' }
				}
			})
			.state('app.login', {
				url: '/login',
				views: {
					'toolbar': { template: '<h2>Login</h2>' },
					'': { templateUrl: 'modules/app/views/login.html' }
				}
			})
			.state('app.signup', {
				url: '/signup',
				views: {
					'toolbar': { template: '<h2>Sign Up</h2>' },
					'': { templateUrl: 'modules/app/views/signup.html' }
				}
			});

		$urlRouterProvider.otherwise('/');
	});
}