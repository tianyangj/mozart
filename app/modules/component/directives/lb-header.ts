namespace lilybook.component {

	function lbHeaderDirective(): ng.IDirective {
		return {
			restrict: 'E',
			templateUrl: 'modules/component/templates/header.html',
			replace: true,
			scope: {
				logout: '&'
			},
			controller: ['$scope', '$mdSidenav', 'searchSvc', ($scope, $mdSidenav, searchSvc: lilybook.data.ISearchSvc) => {
				$scope.toggleSidenav = (sidenavId: string) => {
					$mdSidenav(sidenavId).toggle();
				}
				$scope.search = (query: string) => {
					return searchSvc.search(query).then((results) => {
						return results;
					});
				};
			}]
		};
	}

	module.directive('lbHeader', lbHeaderDirective);
}