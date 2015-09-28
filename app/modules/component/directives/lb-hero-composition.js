var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        function lbHeroCompositionDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<div ng-if=\"video\" class=\"hero-composition-video\">\n\t\t\t\t\t<youtube-video video-url=\"video\" player-width=\"'100%'\" player-height=\"'360px'\" player-vars=\"{autoplay:1,showinfo:0}\"></youtube-video>\n\t\t\t\t</div>\n\t\t\t\t<div ng-if=\"!video\" class=\"hero-composition-image\"></div>\n\t\t\t",
                scope: {
                    video: '='
                }
            };
        }
        component.module.directive('lbHeroComposition', lbHeroCompositionDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
