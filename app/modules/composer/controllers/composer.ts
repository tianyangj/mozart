module lilybook.composer {
    'use strict';

	class ComposerController {

		static $inject = [
			'composer',
			'compositionSvc',
			'$scope',
			'$state'
		];

		constructor(
			public composer: lilybook.data.IComposer,
			private compositionSvc: lilybook.data.ICompositionSvc,
			private $scope,
			private $state
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
			this.$scope.$emit('headerUpdateContext', {
				href: $state.href('app.composers'),
				name: 'Composers'
			});
			this.$scope.$on('selectFormChanged', (event, selectedForm) => {
				this.selectedForm = selectedForm;
				this.compositionSvc.getCompositions(composer, this.selectedForm, this.selectedSort).then(compositions => {
					this.compositions = compositions;
				});
			});
			this.$scope.$on('selectSortChanged', (event, selectedSort) => {
				this.selectedSort = selectedSort;
				this.compositionSvc.getCompositions(composer, this.selectedForm, this.selectedSort).then(compositions => {
					this.compositions = compositions;
				});
			});
		}

		compositions: any;
		compositionGroups: any;
		selectedForm;
		selectedSort;
	}

	lilybook.composer.module.controller('ComposerController', ComposerController);
}