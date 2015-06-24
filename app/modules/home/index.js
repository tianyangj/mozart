var lilybook;
(function (lilybook) {
    var home;
    (function (home) {
        'use strict';
        home.module = angular.module('lilybook.home', [
            'ngMaterial',
            'ui.router'
        ]);
        home.module.config(function ($stateProvider) {
            $stateProvider
                .state('app.home', {
                url: '/home',
                templateUrl: 'modules/home/views/home.html'
            });
        });
    })(home = lilybook.home || (lilybook.home = {}));
})(lilybook || (lilybook = {}));
