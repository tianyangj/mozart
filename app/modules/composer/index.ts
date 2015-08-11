module lilybook.composer {
    'use strict';

    export var module = angular.module('lilybook.composer', [
        'ngMaterial',
        'ui.router'
    ]);

    module.config(($stateProvider) => {
        $stateProvider
            .state('app.composer', {
                url: '/composer/:vanity',
                templateUrl: 'modules/composer/views/composer.html',
                controller: 'ComposerController',
                controllerAs: 'composerCtrl',
                resolve: {
                    composer: ['$stateParams', 'composerSvc', ($stateParams, composerSvc) => {
                        return composerSvc.getComposer($stateParams.vanity);
                    }]
                }
            })
            .state('app.composers', {
                url: '/composers',
                templateUrl: 'modules/composer/views/composers.html',
                controller: 'ComposersController',
                controllerAs: 'composersCtrl'
            });
    });
}