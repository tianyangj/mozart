var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        function lbHeroCompositionDirective() {
            return {
                restrict: 'E',
                templateUrl: 'modules/component/templates/hero-composition.html',
                scope: {
                    composition: '='
                }
            };
        }
        component.module.directive('lbHeroComposition', lbHeroCompositionDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
