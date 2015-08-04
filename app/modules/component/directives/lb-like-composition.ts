module lilybook.component {
	'use strict';

	function lbLikeCompositionDirective(): ng.IDirective {
		return {
			restrict: 'E',
			templateUrl: 'modules/component/templates/like-composition.html',
			scope: {
				composition: '='
			},
			controller: ['$scope', '$rootScope', 'activitySvc', ($scope, $rootScope, activitySvc: lilybook.data.IActivitySvc) => {
				$scope.onClick = () => {
					if ($rootScope.user) {
						if ($scope.liked) {
							activitySvc.unlikeComposition($rootScope.user, $scope.composition).then(() => {
								$scope.liked = !$scope.liked;
								$scope.tooltip = 'I like this';
							});
						} else {
							activitySvc.likeComposition($rootScope.user, $scope.composition).then(() => {
								$scope.liked = !$scope.liked;
								$scope.tooltip = 'Unlike';
							});
						}
					}
				};
				$rootScope.$watch('user', (user) => {
					if (user) {
						activitySvc.hasLikedComposition(user, $scope.composition).then((liked) => {
							$scope.liked = liked;
							if (liked) {
								$scope.tooltip = 'Unlike';
							} else {
								$scope.tooltip = 'I like this';
							}
						});
					} else {
						$scope.tooltip = 'Login to Like';
					}
				});
			}]
		};
	}

	module.directive('lbLikeComposition', lbLikeCompositionDirective);
}