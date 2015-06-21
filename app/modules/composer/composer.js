angular.module('lilybook.composer').controller('ComposerController', function (composer, compositionSvc) {
    var self = this;
    self.composer = composer;
    compositionSvc.getCompositionsByComposer(composer).then(function (compositions) {
        var compositionGroups = {};
        compositions.forEach(function (composition) {
            if (!compositionGroups[composition.type]) {
                compositionGroups[composition.type] = [];
            }
            compositionGroups[composition.type].push(composition);
        });
        self.compositionGroups = compositionGroups;
    });
});
