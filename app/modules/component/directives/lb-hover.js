var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        function lbHoverDirective() {
            return {
                restrict: 'A',
                scope: {
                    z: '@lbHover'
                },
                link: function (scope, element) {
                    element.addClass('pointer');
                    element.on('mouseenter', function () {
                        element.addClass('md-whiteframe-z' + scope.z);
                    }).on('mouseleave', function () {
                        element.removeClass('md-whiteframe-z' + scope.z);
                    });
                }
            };
        }
        component.module.directive('lbHover', lbHoverDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
