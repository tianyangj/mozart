module lilybook.component {
	'use strict';

	function lbSliderDifficultyDirective(): ng.IDirective {
		return {
			restrict: 'E',
			templateUrl: 'modules/component/templates/slider-difficulty.html',
			scope: {
				composition: '='
			},
			controller: ['$scope', '$rootScope', 'activitySvc', ($scope, $rootScope, activitySvc: lilybook.data.IActivitySvc) => {
				activitySvc.getDifficulty($rootScope.user, $scope.composition).then((difficulty) => {
					$scope.mine = difficulty.mine;
					$scope.all = difficulty.all;
				});
				$scope.$watch('mine.difficulty', (newDifficulty, oldDifficulty) => {
					if (newDifficulty && oldDifficulty && newDifficulty !== oldDifficulty) {
						activitySvc.rateDifficulty($rootScope.user, $scope.composition, newDifficulty).then((difficulty) => {
							$scope.mine = difficulty;
						});
					}
				});
			}]
		};
	}

	module.directive('lbSliderDifficulty', lbSliderDifficultyDirective);
}