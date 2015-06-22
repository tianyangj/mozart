module lilybook {
    'use strict';

    export var composer = angular.module('lilybook.composer', [
        'ngMaterial',
        'ui.router'
    ]);

    composer.config(($stateProvider) => {
        $stateProvider.state('app.composer', {
            url: '/composer/:vanity',
            views: {
                'toolbar': {
                    templateUrl: 'modules/composer/views/toolbar.html',
                    controller: 'ComposerToolbarController',
                    controllerAs: 'toolbarCtrl'
                },
                '': {
                    templateUrl: 'modules/composer/views/composer.html',
                    controller: 'ComposerController',
                    controllerAs: 'composerCtrl'
                }
            },
            resolve: {
                composer: ['$stateParams', 'composerSvc', ($stateParams, composerSvc) => {
                    return composerSvc.getComposer($stateParams.vanity);
                }]
            }
        });
    });
}