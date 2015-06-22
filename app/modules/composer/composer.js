var lilybook;
(function (lilybook) {
    'use strict';
    var ComposerController = (function () {
        function ComposerController(composer, compositionSvc) {
            var _this = this;
            this.composer = composer;
            this.compositionSvc = compositionSvc;
            this.compositionSvc.getCompositionsByComposer(composer).then(function (compositions) {
                var compositionGroups = {};
                compositions.forEach(function (composition) {
                    if (!compositionGroups[composition.type]) {
                        compositionGroups[composition.type] = [];
                    }
                    compositionGroups[composition.type].push(composition);
                });
                _this.compositionGroups = compositionGroups;
            });
        }
        ComposerController.$inject = [
            'composer',
            'compositionSvc'
        ];
        return ComposerController;
    })();
    lilybook.composer.controller('ComposerController', ComposerController);
})(lilybook || (lilybook = {}));
