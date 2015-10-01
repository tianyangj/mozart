var lilybook;
(function (lilybook) {
    var discovery;
    (function (discovery) {
        'use strict';
        discovery.module = angular.module('lilybook.discovery', []);
        discovery.module.config(function ($stateProvider) {
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
    })(discovery = lilybook.discovery || (lilybook.discovery = {}));
})(lilybook || (lilybook = {}));
