module lilybook.app {
    'use strict';

    module.config(($locationProvider, $mdThemingProvider, $mdIconProvider) => {

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
}