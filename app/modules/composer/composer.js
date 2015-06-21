angular.module('lilybook.composer').controller('ComposerController', function (composer, compositionSvc) {
    var _this = this;
    this.composer = composer;
    compositionSvc.getCompositionsByComposer(composer).then(function (compositions) {
        var compositionGroups = {};
        compositions.forEach(function (composition) {
            if (!compositionGroups[composition.type]) {
                compositionGroups[composition.type] = [];
            }
            compositionGroups[composition.type].push(composition);
        });
        _this.compositionGroups = compositionGroups;
    });
});
