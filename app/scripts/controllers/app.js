angular.module('lilybook').controller('AppController', function ($mdSidenav, menuSvc) {

	var self = this;

	menuSvc.getSideNav().then(function (sidenav) {
		self.sidenav = sidenav;
	});
	
	self.toggleSidenav = function(sidenavId) {
		$mdSidenav(sidenavId).toggle();
	};
});