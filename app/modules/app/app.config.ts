module lilybook.app {
    'use strict';

    lilybook.app.module.config(($locationProvider, $mdThemingProvider, $mdIconProvider) => {

        $locationProvider
            .html5Mode(false)
            .hashPrefix('!');

        $mdIconProvider
            .icon("music_library", "./assets/svg/ic_library_music_black_48px.svg", 24)
            .icon("arrow_right", "./assets/svg/ic_chevron_right_black_48px.svg", 24);

        $mdThemingProvider
            .theme('default')
            .primaryPalette('blue')
            .accentPalette('green');
    });
}