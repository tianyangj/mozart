module lilybook.composer {
    'use strict';

	export class ComposerController {

		public static $inject = [
			'composer',
			'compositionSvc'
		];

		constructor(
			public composer: any,
			private compositionSvc: any
			) {
			this.compositionSvc.getCompositionsByComposer(composer).then(compositions => {
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

		public compositionGroups: any;
	}

	lilybook.composer.module.controller('ComposerController', ComposerController);
}