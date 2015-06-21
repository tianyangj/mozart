angular.module('lilybook.composer', [
    'ngMaterial',
    'ui.router'
]).config(function($stateProvider) {
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
            composer: ['$stateParams', 'composerSvc', function($stateParams, composerSvc) {
                return composerSvc.getComposer($stateParams.vanity);
            }]
        }
    });
});