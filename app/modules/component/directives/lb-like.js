var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        function lbLikeDirective() {
            return {
                restrict: 'E',
                templateUrl: 'modules/component/templates/like.html',
                scope: {
                    data: '='
                },
                controller: ['$scope', 'userSvc', function ($scope, userSvc) {
                        $scope.like = function () {
                            if (!userSvc.isAuthenticated()) {
                                alert('not yet');
                            }
                            else {
                                console.log('to like...', $scope);
                            }
                        };
                    }]
            };
        }
        component.module.directive('lbLike', lbLikeDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
