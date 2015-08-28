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
			this.compositionSvc.getCompositionTypes()
				.then((compositionTypes) => {
					this.forms = compositionTypes;
				});
			this.sorts = [
				{ id: 0, name: 'Alphabetical' },
				{ id: 1, name: 'Difficulties / Grades' },
				{ id: 2, name: 'Popularity' }
			];
			this.$scope.$emit('headerUpdateContext', {
				href: $state.href('app.composers'),
				name: 'Composers'
			});
			this.$scope.$watch(() => {
				return this.selectedForm;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.compositionSvc.getCompositions(composer, newVal).then(compositions => {
						this.compositions = compositions;
					});
				}
			});
		}

		compositions: any;
		compositionGroups: any;
		forms: data.ICompositionType[];
		sorts;
		selectedForm;
		selectedSort;
	}

	lilybook.composer.module.controller('ComposerController', ComposerController);
}