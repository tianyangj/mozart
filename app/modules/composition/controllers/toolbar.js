var lilybook;
(function (lilybook) {
    var composition;
    (function (composition_1) {
        'use strict';
        var CompositionToolbarController = (function () {
            function CompositionToolbarController(composition) {
                this.composition = composition;
            }
            CompositionToolbarController.$inject = ['composition'];
            return CompositionToolbarController;
        })();
        lilybook.composition.module.controller('CompositionToolbarController', CompositionToolbarController);
    })(composition = lilybook.composition || (lilybook.composition = {}));
})(lilybook || (lilybook = {}));
