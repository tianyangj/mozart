module lilybook.discovery {
    'use strict';

	class DiscoveryController {

		static $inject = [
			'compositionSvc',
			'composerSvc'
		];

		constructor(
			private compositionSvc: lilybook.data.ICompositionSvc,
			private composerSvc: lilybook.data.IComposerSvc
			) {
			this.compositionSvc.getCompositionTypes()
				.then((compositionTypes) => {
					this.compositionTypes = compositionTypes;
				});
			this.composerSvc.getComposers(0, 100)
				.then((composers) => {
					this.composers = composers.filter((composer) => {
						return composer.image !== null;
					});
				});
		}

		compositionTypes: lilybook.data.ICompositionType[];
		composers: lilybook.data.IComposer[];
	}

	lilybook.discovery.module.controller('DiscoveryController', DiscoveryController);
}