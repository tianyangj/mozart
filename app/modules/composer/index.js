var lilybook;
(function (lilybook) {
    var composer;
    (function (composer) {
        'use strict';
        composer.module = angular.module('lilybook.composer', [
            'ngMaterial',
            'ui.router'
        ]);
        composer.module.config(function ($stateProvider) {
            $stateProvider
                .state('app.composer', {
                url: '/composer/:vanity',
                templateUrl: 'modules/composer/views/composer.html',
                controller: 'ComposerController',
                controllerAs: 'composerCtrl',
                resolve: {
                    composer: ['$stateParams', 'composerSvc', function ($stateParams, composerSvc) {
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
    })(composer = lilybook.composer || (lilybook.composer = {}));
})(lilybook || (lilybook = {}));
