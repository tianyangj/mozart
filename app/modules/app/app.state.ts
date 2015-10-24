namespace lilybook.app {

	module.config(['$stateProvider', '$urlRouterProvider',
		($stateProvider, $urlRouterProvider) => {

			$stateProvider
				.state('app', {
					abstract: true,
					url: '',
					templateUrl: 'layout.html',
					controller: 'AppController',
					controllerAs: 'appCtrl'
				})
				.state('app.splash', {
					url: '/',
					templateUrl: 'modules/app/views/splash.html'
				})
				.state('app.login', {
					url: '/login',
					templateUrl: 'modules/app/views/login.html'
				})
				.state('app.signup', {
					url: '/signup',
					templateUrl: 'modules/app/views/signup.html'
				});

			$urlRouterProvider.otherwise('/');
		}
	]);
}