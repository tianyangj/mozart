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
					this.forms = compositionTypes;
				});
			this.composerSvc.getFeaturedComposers()
				.then((composers) => {
					this.composers = composers.slice(0, 4);
				});
		}

		forms: lilybook.data.ICompositionType[];
		composers: lilybook.data.IComposer[];
	}

	lilybook.discovery.module.controller('DiscoveryController', DiscoveryController);
}