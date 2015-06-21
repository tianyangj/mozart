angular.module('lilybook.composer').controller('ComposerController', function(composer, compositionSvc) {

	this.composer = composer;

	compositionSvc.getCompositionsByComposer(composer).then(compositions => {
		var compositionGroups = {};
		compositions.forEach(composition => {
			if (!compositionGroups[composition.type]) {
				compositionGroups[composition.type] = [];
			}
			compositionGroups[composition.type].push(composition);
		});
		this.compositionGroups = compositionGroups;
	});
});