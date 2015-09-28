module lilybook.discovery {
    'use strict';

	class BrowseController {

		static $inject = [
			'compositionSvc',
			'$scope'
		];

		constructor(
			private compositionSvc: lilybook.data.ICompositionSvc,
			private $scope
			) {
			this.getCompositions();
			this.$scope.$on('selectComposerChanged', (event, selectedComposer) => {
				this.selectedComposer = selectedComposer;
				this.getCompositions();
			});
			this.$scope.$on('selectFormChanged', (event, selectedForm) => {
				this.selectedForm = selectedForm;
				this.getCompositions();
			});
			this.$scope.$on('selectDifficultyChanged', (event, selectedDifficulty) => {
				this.selectedDifficulty = selectedDifficulty;
				this.getCompositions();
			});
			this.$scope.$on('selectSortChanged', (event, selectedSort) => {
				this.selectedSort = selectedSort;
				this.getCompositions();
			});
		}

		getCompositions() {
			this.compositionSvc.getCompositions({
				composerId: this.selectedComposer,
				typeId: this.selectedForm,
				difficultyId: this.selectedDifficulty,
				sortId: this.selectedSort
			}).then(compositions => {
				this.compositions = compositions;
			});
		}

		compositions: lilybook.data.IComposition[];
		selectedComposer;
		selectedForm;
		selectedDifficulty;
		selectedSort;
	}

	lilybook.discovery.module.controller('BrowseController', BrowseController);
}