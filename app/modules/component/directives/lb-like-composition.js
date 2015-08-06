var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        function lbLikeCompositionDirective() {
            return {
                restrict: 'E',
                templateUrl: 'modules/component/templates/like-composition.html',
                scope: {
                    composition: '='
                },
                controller: ['$scope', '$rootScope', 'activitySvc', function ($scope, $rootScope, activitySvc) {
                        $scope.onClick = function () {
                            if ($rootScope.user) {
                                if ($scope.liked) {
                                    activitySvc.unlikeComposition($rootScope.user, $scope.composition).then(function () {
                                        $scope.liked = !$scope.liked;
                                        $scope.tooltip = 'I like this';
                                        $scope.total--;
                                    });
                                }
                                else {
                                    activitySvc.likeComposition($rootScope.user, $scope.composition).then(function () {
                                        $scope.liked = !$scope.liked;
                                        $scope.tooltip = 'Unlike';
                                        $scope.total++;
                                    });
                                }
                            }
                        };
                        $rootScope.$watch('user', function (user) {
                            if (user) {
                                activitySvc.hasLikedComposition(user, $scope.composition).then(function (liked) {
                                    $scope.liked = liked;
                                    $scope.tooltip = liked ? 'Unlike' : 'I like this';
                                });
                            }
                            else {
                                $scope.tooltip = 'Login to Like';
                            }
                        });
                        activitySvc.totalLikedComposition($scope.composition).then(function (count) {
                            $scope.total = count;
                        });
                    }]
            };
        }
        component.module.directive('lbLikeComposition', lbLikeCompositionDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
