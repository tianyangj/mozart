var lilybook;
(function (lilybook) {
    'use strict';
    var ComposerToolbarController = (function () {
        function ComposerToolbarController(composer) {
            this.composer = composer;
        }
        ComposerToolbarController.$inject = ['composer'];
        return ComposerToolbarController;
    })();
    lilybook.composer.controller('ComposerToolbarController', ComposerToolbarController);
})(lilybook || (lilybook = {}));
