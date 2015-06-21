module lilybook {
	'use strict';

	lilybook.main.config(($stateProvider, $urlRouterProvider) => {

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
				views: {
					'toolbar': { template: '<h2>Splash</h2>' },
					'': { templateUrl: 'views/pages/splash.html' }
				}
			})
			.state('app.login', {
				url: '/login',
				views: {
					'toolbar': { template: '<h2>Login</h2>' },
					'': { templateUrl: 'views/pages/login.html' }
				}
			})
			.state('app.signup', {
				url: '/signup',
				views: {
					'toolbar': { template: '<h2>Sign Up</h2>' },
					'': { templateUrl: 'views/pages/signup.html' }
				}
			})
			.state('app.composers', {
				url: '/composers',
				views: {
					'toolbar': { template: '<h2>Composers</h2>' },
					'': {
						templateUrl: 'views/pages/composers.html',
						controller: 'ComposersController',
						controllerAs: 'composersCtrl'
					}
				}
			})
			.state('app.home', {
				url: '/home',
				templateUrl: 'views/pages/home.html'
			});

		$urlRouterProvider.otherwise('/');
	});
}