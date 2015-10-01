module lilybook.discovery {

	class DiscoveryController {

		forms: lilybook.data.IForm[];
		composers: lilybook.data.IComposer[];

		static $inject = [
			'definitionSvc',
			'composerSvc'
		];

		constructor(
			private definitionSvc: lilybook.data.IDefinitionSvc,
			private composerSvc: lilybook.data.IComposerSvc
			) {
			this.definitionSvc.getForms().then((forms) => {
				this.forms = forms;
			});
			this.composerSvc.getFeaturedComposers().then((composers) => {
				this.composers = composers.slice(0, 4);
			});
		}
	}

	lilybook.discovery.module.controller('DiscoveryController', DiscoveryController);
}