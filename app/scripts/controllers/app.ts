module lilybook {
	'use strict';

	class AppController {

		public static $inject = [
			'$rootScope',
			'$state',
			'$mdSidenav',
			'$mdToast',
			'menuSvc',
			'userSvc',
		];

		constructor(
			private $rootScope: any,
			private $state: angular.ui.IStateService,
			private $mdSidenav: any,
			private $mdToast: any,
			private menuSvc: any,
			private userSvc: any
			) {
			this.menuSvc.getSideNav().then((sidenav) => {
				this.sidenav = sidenav;
			});
			this.userSvc.current().then((user) => {
				this.$rootScope.user = user;
			});
			this.$rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
				console.log('$stateChangeError', error);
				if (error === 'AUTH_REQUIRED') {
					this.$state.go('app.login');
				}
			});
		}

		public sidenav: any[];

		private getSimpleToast = (message: string) => {
			return this.$mdToast
				.simple()
				.content(message)
				.position('top right');
		};

		toggleSidenav = (sidenavId: string) => {
			this.$mdSidenav(sidenavId).toggle();
		}

		signup = (signupData: any) => {
			this.userSvc.signUp(signupData.email, signupData.password, signupData.firstname, signupData.lastname).then((user) => {
				this.$rootScope.user = user;
				this.$state.go('app.home');
			}, (error) => {
				this.$mdToast.show(this.getSimpleToast(error.message));
			});
		};

		login = (loginData: any) => {
			this.userSvc.logIn(loginData.email, loginData.password).then((user) => {
				this.$rootScope.user = user;
				this.$state.go('app.home');
			}, (error) => {
				this.$mdToast.show(this.getSimpleToast(error.message));
			});
		};

		logout = () => {
			this.userSvc.logOut().then(() => {
				this.$rootScope.user = null;
				this.$state.go('app.splash');
			});
		};
	}

	lilybook.main.controller('AppController', AppController);
}