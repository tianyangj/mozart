var lilybook;
(function (lilybook) {
    var discovery;
    (function (discovery) {
        'use strict';
        discovery.module = angular.module('lilybook.discovery', []);
        discovery.module.config(function ($stateProvider) {
            $stateProvider
                .state('app.discovery', {
                url: '/discovery',
                templateUrl: 'modules/discovery/views/discovery.html',
                controller: 'DiscoveryController',
                controllerAs: 'discoveryCtrl'
            });
        });
    })(discovery = lilybook.discovery || (lilybook.discovery = {}));
})(lilybook || (lilybook = {}));
