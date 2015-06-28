var lilybook;
(function (lilybook) {
    var composition;
    (function (composition_1) {
        'use strict';
        var CompositionController = (function () {
            function CompositionController(composition, compositionSvc) {
                this.composition = composition;
                this.compositionSvc = compositionSvc;
            }
            CompositionController.$inject = [
                'composition',
                'compositionSvc'
            ];
            return CompositionController;
        })();
        composition_1.module.controller('CompositionController', CompositionController);
    })(composition = lilybook.composition || (lilybook.composition = {}));
})(lilybook || (lilybook = {}));
