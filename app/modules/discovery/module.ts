module lilybook.discovery {
    'use strict';

    export var module = angular.module('lilybook.discovery', []);

    module.config(($stateProvider) => {
        $stateProvider
            .state('app.browse', {
                url: '/browse?composer&form&level',
                templateUrl: 'modules/discovery/views/browse.html',
                controller: 'BrowseController',
                controllerAs: 'browseCtrl'
            })
            .state('app.discovery', {
                url: '/discover',
                templateUrl: 'modules/discovery/views/discovery.html',
                controller: 'DiscoveryController',
                controllerAs: 'discoveryCtrl'
            });
    });
}