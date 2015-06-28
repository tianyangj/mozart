var lilybook;
(function (lilybook) {
    var composer;
    (function (composer_1) {
        'use strict';
        var ComposerToolbarController = (function () {
            function ComposerToolbarController(composer) {
                this.composer = composer;
            }
            ComposerToolbarController.$inject = ['composer'];
            return ComposerToolbarController;
        })();
        lilybook.composer.module.controller('ComposerToolbarController', ComposerToolbarController);
    })(composer = lilybook.composer || (lilybook.composer = {}));
})(lilybook || (lilybook = {}));
