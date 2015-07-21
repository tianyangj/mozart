module lilybook.app {
	'use strict';

	export class AppController {

		static $inject = [
			'$rootScope',
			'$state',
			'$mdSidenav',
			'$mdToast',
			'menuSvc',
			'userSvc',
			'searchSvc'
		];

		constructor(
			private $rootScope: ng.IRootScopeService,
			private $state: angular.ui.IStateService,
			private $mdSidenav: any,
			private $mdToast: any,
			private menuSvc: lilybook.data.IMenuSvc,
			private userSvc: lilybook.data.IUserSvc,
			private searchSvc: lilybook.data.ISearchSvc
			) {
			this.menuSvc.getSideNav().then((sidenav) => {
				this.sidenav = sidenav;
			});
			this.$rootScope['user'] = this.userSvc.current();
			this.$rootScope.$on('$stateChangeSuccess', (event, toState, toParams, fromState, fromParams) => {
				this.$mdSidenav('left').close();
			});
			this.$rootScope.$on('$stateChangeError', (event, toState, toParams, fromState, fromParams, error) => {
				console.log('$stateChangeError', error);
				if (error === 'AUTH_REQUIRED') {
					this.$state.go('app.login');
				}
			});
		}

		private getSimpleToast = (message: string) => {
			return this.$mdToast
				.simple()
				.content(message)
				.position('top right');
		};

		sidenav: any[];

		toggleSidenav = (sidenavId: string) => {
			this.$mdSidenav(sidenavId).toggle();
		}

		signup = (signupData: any) => {
			this.userSvc.signUp(signupData.email, signupData.password, signupData.firstname, signupData.lastname)
				.then((user) => {
					this.$rootScope['user'] = user;
					this.$state.go('app.home');
				}, (error) => {
					this.$mdToast.show(this.getSimpleToast(error.message));
				});
		};

		login = (loginData: any) => {
			this.userSvc.logIn(loginData.email, loginData.password)
				.then((user) => {
					this.$rootScope['user'] = user;
					this.$state.go('app.home');
				}, (error) => {
					this.$mdToast.show(this.getSimpleToast(error.message));
				});
		};

		logout = () => {
			this.userSvc.logOut()
				.then(() => {
					this.$rootScope['user'] = null;
					this.$state.go('app.splash');
				});
		};

		search = (query) => {
			return this.searchSvc.search(query)
				.then((results) => {
					return results;
				});
		};
	}

	lilybook.app.module.controller('AppController', AppController);
}