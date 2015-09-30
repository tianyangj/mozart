module lilybook.component {

	class SelectDifficultyController {

		static $inject = [
			'$scope',
			'$location',
			'definitionSvc'
		];

		constructor(
			private $scope,
			private $location,
			private definitionSvc: lilybook.data.IDefinitionSvc
			) {
			this.$scope.$watch(() => {
				return this.difficulty;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.$scope.$emit('selectDifficultyChanged', newVal.id);
				}
			});
			if (this.$location.search().level) {
				this.loadData(this.$location.search().level);
			}
		}

		onOpen() {
			if (!this.difficulties) {
				return this.loadData();
			}
		}

		onChange() {
			this.$location.search('level', this.difficulty.value);
		}

		loadData(querystring?) {
			return this.definitionSvc.getDifficulties().then((difficulties) => {
				this.difficulties = difficulties;
				if (querystring) {
					this.difficulties.forEach((difficulty) => {
						if (difficulty.value === querystring) {
							this.difficulty = difficulty;
						}
					});
				}
			});
		}

		difficulty: lilybook.data.IDifficulty;
		difficulties: lilybook.data.IDifficulty[];
	}

	function lbSelectDifficultyDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-input-container>
        			<label>Difficulty & Level</label>
        			<md-select
						ng-model="selectDifficultyCtrl.difficulty"
						ng-model-options="{trackBy: '$value.id'}"
						md-on-open="selectDifficultyCtrl.onOpen()"
						ng-change="selectDifficultyCtrl.onChange()">
						<md-option>All</md-option>
						<md-divider></md-divider>
          				<md-option ng-repeat="difficulty in selectDifficultyCtrl.difficulties" ng-value="{{difficulty}}">{{difficulty.name}}</md-option>
        			</md-select>
      			</md-input-container>
			`,
			controller: SelectDifficultyController,
			controllerAs: 'selectDifficultyCtrl'
		};
	}

	module.directive('lbSelectDifficulty', lbSelectDifficultyDirective);
}