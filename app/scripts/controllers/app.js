angular.module('lilybook').controller('AppController', function ($rootScope, $state, $mdSidenav, $mdToast, menuSvc, userSvc) {

	var self = this;

	var getSimpleToast = function (message) {
		return $mdToast.simple().content(message).position('top right');
	};

	menuSvc.getSideNav().then(function (sidenav) {
		self.sidenav = sidenav;
	});

	self.toggleSidenav = function (sidenavId) {
		$mdSidenav(sidenavId).toggle();
	};

	self.login = function (loginData) {
		userSvc.logIn(loginData.email, loginData.password).then(function (user) {
			loginData.error = null;
			$rootScope.user = user;
			$state.go('app.home');
		}, function (error) {
				loginData.error = error;
				$mdToast.show(getSimpleToast(error.message));
			});
	};
});