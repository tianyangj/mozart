var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        function lbHeaderDirective() {
            return {
                restrict: 'E',
                templateUrl: 'modules/component/templates/header.html',
                replace: true,
                scope: {
                    context: '=',
                    logout: '&'
                },
                controller: ['$scope', '$mdSidenav', 'searchSvc', function ($scope, $mdSidenav, searchSvc) {
                        $scope.toggleSidenav = function (sidenavId) {
                            $mdSidenav(sidenavId).toggle();
                        };
                        $scope.search = function (query) {
                            return searchSvc.search(query).then(function (results) {
                                return results;
                            });
                        };
                    }]
            };
        }
        component.module.directive('lbHeader', lbHeaderDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
