module lilybook.discovery {
    'use strict';

    export var module = angular.module('lilybook.discovery', []);

    module.config(($stateProvider) => {
        $stateProvider
            .state('app.browse', {
				url: '/browse',
				templateUrl: 'modules/discovery/views/browse.html'
			})
            .state('app.discovery', {
                url: '/discovery',
                templateUrl: 'modules/discovery/views/discovery.html',
                controller: 'DiscoveryController',
                controllerAs: 'discoveryCtrl'
            });
    });
}