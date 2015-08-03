module lilybook.component {
	'use strict';

	function lbLikeDirective(): ng.IDirective {
		return {
			restrict: 'E',
			templateUrl: 'modules/component/templates/like.html',
			scope: {
				data: '='
			},
			controller: ['$scope', 'userSvc', ($scope, userSvc: lilybook.data.IUserSvc) => {
				$scope.like = () => {
					if (!userSvc.isAuthenticated()) {
						alert('not yet')
					} else {
						console.log('to like...', $scope)
					}
				};
			}]
		};
	}

	module.directive('lbLike', lbLikeDirective);
}