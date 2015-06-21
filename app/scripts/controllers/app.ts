angular.module('lilybook').controller('AppController', function($rootScope, $state, $mdSidenav, $mdToast, menuSvc, userSvc) {

	var getSimpleToast = function(message) {
		return $mdToast.simple().content(message).position('top right');
	};

	menuSvc.getSideNav().then(sidenav => {
		this.sidenav = sidenav;
	});

	userSvc.current().then(function(user) {
		$rootScope.user = user;
	});

	this.toggleSidenav = function(sidenavId) {
		$mdSidenav(sidenavId).toggle();
	};

	this.signup = function(signupData) {
		userSvc.signUp(signupData.email, signupData.password, signupData.firstname, signupData.lastname).then(function(user) {
			$rootScope.user = user;
			$state.go('app.home');
		}, function(error) {
			$mdToast.show(getSimpleToast(error.message));
		});
	};

	this.login = function(loginData) {
		userSvc.logIn(loginData.email, loginData.password).then(function(user) {
			$rootScope.user = user;
			$state.go('app.home');
		}, function(error) {
			$mdToast.show(getSimpleToast(error.message));
		});
	};

	this.logout = function() {
		userSvc.logOut().then(function() {
			$rootScope.user = null;
			$state.go('app.splash');
		});
	};

	$rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, error) {
		console.log('$stateChangeError', arguments);
		if (error === 'AUTH_REQUIRED') {
			$state.go('app.login');
		}
	});
});