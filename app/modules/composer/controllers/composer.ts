module lilybook.composer {
    'use strict';

	class ComposerController {

		static $inject = [
			'composer',
			'compositionSvc'
		];

		constructor(
			public composer: lilybook.data.IComposer,
			private compositionSvc: lilybook.data.ICompositionSvc
			) {
			this.compositionSvc.getCompositions(composer).then(compositions => {
				this.compositions = compositions;
				var compositionGroups = {};
				compositions.forEach(composition => {
					if (!compositionGroups[composition.type]) {
						compositionGroups[composition.type] = [];
					}
					compositionGroups[composition.type].push(composition);
				});
				this.compositionGroups = compositionGroups;
			});
		}

		compositions: any;
		compositionGroups: any;
	}

	lilybook.composer.module.controller('ComposerController', ComposerController);
}