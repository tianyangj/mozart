module lilybook.component {

	class SelectDifficultyController {

		static $inject = [
			'$scope',
			'definitionSvc'
		];

		constructor(
			private $scope,
			private definitionSvc: lilybook.data.IDefinitionSvc
			) {
			this.$scope.$watch(() => {
				return this.difficultyId;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.$scope.$emit('selectDifficultyChanged', newVal);
				}
			});
		}

		loadDifficulties() {
			if (!this.difficulties) {
				return this.definitionSvc.getDifficulties().then((difficulties) => {
					this.difficulties = difficulties;
				});
			}
		}

		difficultyId;
		difficulties;
	}

	function lbSelectDifficultyDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-input-container>
        			<label>Difficulty & Level</label>
        			<md-select ng-model="selectDifficultyCtrl.difficultyId" md-on-open="selectDifficultyCtrl.loadDifficulties()">
          				<md-option ng-repeat="difficulty in selectDifficultyCtrl.difficulties" value="{{difficulty.id}}">{{difficulty.name}}</md-option>
        			</md-select>
      			</md-input-container>
			`,
			controller: SelectDifficultyController,
			controllerAs: 'selectDifficultyCtrl'
		};
	}

	module.directive('lbSelectDifficulty', lbSelectDifficultyDirective);
}