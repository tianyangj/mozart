module lilybook.discovery {
    'use strict';

	class BrowseController {

		static $inject = [
			'compositionSvc',
			'$scope',
			'$timeout'
		];

		constructor(
			private compositionSvc: lilybook.data.ICompositionSvc,
			private $scope,
			private $timeout
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
			this.loading = true;
			this.$timeout.cancel(this.timeout);
			this.timeout = this.$timeout(() => {
				this.compositionSvc.getCompositions({
					composerId: this.selectedComposer,
					typeId: this.selectedForm,
					difficultyId: this.selectedDifficulty,
					sortId: this.selectedSort
				}).then(compositions => {
					this.loading = false;
					this.compositions = compositions;
				});
			}, 600);
		}

		compositions: lilybook.data.IComposition[];
		selectedComposer;
		selectedForm;
		selectedDifficulty;
		selectedSort;
		timeout;
		loading: boolean = false;
	}

	lilybook.discovery.module.controller('BrowseController', BrowseController);
}