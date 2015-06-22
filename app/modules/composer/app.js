var lilybook;
(function (lilybook) {
    'use strict';
    lilybook.composer = angular.module('lilybook.composer', [
        'ngMaterial',
        'ui.router'
    ]);
    lilybook.composer.config(function ($stateProvider) {
        $stateProvider
            .state('app.composer', {
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
                composer: ['$stateParams', 'composerSvc', function ($stateParams, composerSvc) {
                        return composerSvc.getComposer($stateParams.vanity);
                    }]
            }
        })
            .state('app.composers', {
            url: '/composers',
            views: {
                'toolbar': { template: '<h2>Composers</h2>' },
                '': {
                    templateUrl: 'modules/composer/views/composers.html',
                    controller: 'ComposersController',
                    controllerAs: 'composersCtrl'
                }
            }
        });
    });
})(lilybook || (lilybook = {}));
