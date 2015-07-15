var lilybook;
(function (lilybook) {
    var app;
    (function (app) {
        'use strict';
        app.module.config(function ($locationProvider, $mdThemingProvider, $mdIconProvider) {
            $locationProvider
                .html5Mode(false)
                .hashPrefix('!');
            $mdIconProvider
                .icon("music_library", "./assets/svg/ic_library_music.svg", 24)
                .icon("arrow_right", "./assets/svg/ic_chevron_right.svg", 24)
                .icon("close", "./assets/svg/ic_close.svg", 24);
            $mdThemingProvider
                .theme('default')
                .primaryPalette('blue')
                .accentPalette('pink');
        });
    })(app = lilybook.app || (lilybook.app = {}));
})(lilybook || (lilybook = {}));
