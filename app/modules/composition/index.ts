module lilybook.composition {
    'use strict';

    export var module = angular.module('lilybook.composition', [
        'ngMaterial',
        'ui.router'
    ]);

    module.config(($stateProvider) => {
        $stateProvider
            .state('app.composition', {
                url: '/composition/:vanity/:id',
                views: {
                    'toolbar': {
                        templateUrl: 'modules/composition/views/toolbar.html',
                        controller: 'CompositionToolbarController',
                        controllerAs: 'toolbarCtrl'
                    },
                    '': {
                        templateUrl: 'modules/composition/views/composition.html',
                        controller: 'CompositionController',
                        controllerAs: 'compositionCtrl'
                    }
                },
                resolve: {
                    composition: ['$stateParams', 'compositionSvc', ($stateParams, compositionSvc) => {
                        return compositionSvc.getComposition($stateParams.id);
                    }]
                }
            });
    });
}