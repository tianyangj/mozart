module lilybook.discovery {
    'use strict';

    export var module = angular.module('lilybook.discovery', []);

    module.config(($stateProvider) => {
        $stateProvider
            .state('app.discovery', {
                url: '/discovery',
                views: {
                    'toolbar': { template: '<h2>Discovery</h2>' },
                    '': {
                        templateUrl: 'modules/discovery/views/discovery.html',
                        controller: 'DiscoveryController',
                        controllerAs: 'discoveryCtrl'
                    }
                }
            });
    });
}