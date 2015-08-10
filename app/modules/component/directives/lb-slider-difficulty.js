var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        function lbSliderDifficultyDirective() {
            return {
                restrict: 'E',
                templateUrl: 'modules/component/templates/slider-difficulty.html',
                scope: {
                    composition: '='
                },
                controller: ['$scope', '$rootScope', 'activitySvc', function ($scope, $rootScope, activitySvc) {
                        activitySvc.getDifficulty($rootScope.user, $scope.composition).then(function (difficulty) {
                            $scope.mine = difficulty.mine;
                            $scope.all = difficulty.all;
                        });
                        $scope.$watch('mine.difficulty', function (newDifficulty, oldDifficulty) {
                            if (newDifficulty && oldDifficulty && newDifficulty !== oldDifficulty) {
                                activitySvc.rateDifficulty($rootScope.user, $scope.composition, newDifficulty).then(function (difficulty) {
                                    $scope.mine = difficulty;
                                });
                            }
                        });
                    }]
            };
        }
        component.module.directive('lbSliderDifficulty', lbSliderDifficultyDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
