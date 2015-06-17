angular.module('lilybook.composer').controller('ComposerController', function ($stateParams, composerSvc, compositionSvc) {

	var self = this;

	composerSvc.getComposer($stateParams.vanity).then(function (composer) {
		console.log(composer);
		self.composer = composer;
		compositionSvc.getCompositionsByComposer(composer).then(function (compositions) {
			console.log(compositions);
			self.compositions = compositions;
		});
	});

});