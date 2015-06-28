module lilybook.data {
	'use strict';

	export interface ISideNavItem {
		icon: string,
		title: string
	}

	export interface ISideNavGroup {
		subheader: string,
		items: ISideNavItem[]
	}

	export interface IMenuSvc {
		getSideNav(): ng.IPromise<ISideNavGroup[]>
	}

	class MenuSvc implements IMenuSvc {

		static $inject = ['$q'];

		constructor(private $q: ng.IQService) { };

		getSideNav() {
			var menu: ISideNavGroup[];
			menu = [{
				subheader: 'Your Hub',
				items: [
					{ icon: 'home', title: 'Home' },
					{ icon: 'portrait', title: 'Profile' },
					{ icon: 'group', title: 'Friends' },
					{ icon: 'home', title: 'Loved' },
					{ icon: 'home', title: 'History' }
				]
			}, {
					subheader: 'Discovery',
					items: [
						{ icon: 'home', title: 'Recommendations' },
						{ icon: 'portrait', title: 'Composers' },
						{ icon: 'group', title: 'Compositions' }
					]
				}, {
					subheader: 'Management',
					items: [
						{ icon: 'home', title: 'Login' },
						{ icon: 'portrait', title: 'Signup' },
						{ icon: 'group', title: 'Account' },
						{ icon: 'group', title: 'Setting' }
					]
				}];
			return this.$q.when(menu);
		}
	}

	lilybook.data.module.service('menuSvc', MenuSvc);
}