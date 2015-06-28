var lilybook;
(function (lilybook) {
    var composition;
    (function (composition) {
        'use strict';
        composition.module = angular.module('lilybook.composition', [
            'ngMaterial',
            'ui.router'
        ]);
        composition.module.config(function ($stateProvider) {
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
                    composition: ['$stateParams', 'compositionSvc', function ($stateParams, compositionSvc) {
                            return compositionSvc.getComposition($stateParams.id);
                        }]
                }
            });
        });
    })(composition = lilybook.composition || (lilybook.composition = {}));
})(lilybook || (lilybook = {}));
