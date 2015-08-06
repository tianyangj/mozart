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
								$scope.total--;
							});
						} else {
							activitySvc.likeComposition($rootScope.user, $scope.composition).then(() => {
								$scope.liked = !$scope.liked;
								$scope.tooltip = 'Unlike';
								$scope.total++;
							});
						}
					}
				};
				$rootScope.$watch('user', (user) => {
					if (user) {
						activitySvc.hasLikedComposition(user, $scope.composition).then((liked) => {
							$scope.liked = liked;
							$scope.tooltip = liked ? 'Unlike' : 'I like this';
						});
					} else {
						$scope.tooltip = 'Login to Like';
					}
				});
				activitySvc.totalLikedComposition($scope.composition).then((count) => {
					$scope.total = count;
				});
			}]
		};
	}

	module.directive('lbLikeComposition', lbLikeCompositionDirective);
}