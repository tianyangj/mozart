angular.module('lilybook').controller('AppController', function (menuSvc) {

	var self = this;

	menuSvc.getSideNav().then(function (sidenav) {
		self.sidenav = sidenav;
	});
});