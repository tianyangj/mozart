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
			this.getCompositions();
			this.$scope.$on('selectFormChanged', (event, selectedForm) => {
				this.selectedForm = selectedForm;
				this.getCompositions();
			});
			this.$scope.$on('selectSortChanged', (event, selectedSort) => {
				this.selectedSort = selectedSort;
				this.getCompositions();
			});
		}

		getCompositions() {
			this.compositionSvc.getCompositions({
				composer: this.composer,
				typeId: this.selectedForm,
				sortId: this.selectedSort
			}).then(compositions => {
				this.compositions = compositions;
			});
		}

		compositions: any;
		selectedForm;
		selectedSort;
	}

	lilybook.composer.module.controller('ComposerController', ComposerController);
}