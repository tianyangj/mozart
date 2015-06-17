angular.module('lilybook').config(function ($locationProvider, $mdThemingProvider, $mdIconProvider) {

    $locationProvider.html5Mode(false).hashPrefix('!');

    $mdIconProvider
        .defaultIconSet("./assets/svg/avatars.svg", 128)
        .icon("menu", "./assets/svg/menu.svg", 24)
        .icon("share", "./assets/svg/share.svg", 24)
        .icon("music_library", "./assets/svg/ic_library_music_black_48px.svg", 24)
        .icon("arrow_right", "./assets/svg/ic_chevron_right_black_48px.svg", 24)
        .icon("google_plus", "./assets/svg/google_plus.svg", 512)
        .icon("hangouts", "./assets/svg/hangouts.svg", 512)
        .icon("twitter", "./assets/svg/twitter.svg", 512)
        .icon("phone", "./assets/svg/phone.svg", 512);

    $mdThemingProvider.theme('default')
        .primaryPalette('blue');

});