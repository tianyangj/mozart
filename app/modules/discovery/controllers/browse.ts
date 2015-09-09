module lilybook.discovery {
    'use strict';

	class BrowseController {

		static $inject = [
			'compositionSvc',
			'composerSvc',
			'$scope'
		];

		constructor(
			private compositionSvc: lilybook.data.ICompositionSvc,
			private composerSvc: lilybook.data.IComposerSvc,
			private $scope
			) {
			this.compositionSvc.getCompositionTypes()
				.then((compositionTypes) => {
					this.forms = compositionTypes;
				});
			this.composerSvc.getFeaturedComposers()
				.then((composers) => {
					this.composers = composers.slice(0, 4);
				});
			this.$scope.$on('selectFormChanged', (event, selectedForm) => {
				console.log(selectedForm)
			})
		}

		forms: lilybook.data.ICompositionType[];
		composers: lilybook.data.IComposer[];
	}

	lilybook.discovery.module.controller('BrowseController', BrowseController);
}