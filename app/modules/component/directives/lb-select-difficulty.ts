module lilybook.component {
	'use strict';

	class SelectDifficultyController {

		static $inject = [
			'$scope'
		];

		constructor(
			private $scope
			) {
			this.difficulties = [
				{ id: 1, name: 'Level 1' },
				{ id: 2, name: 'Level 2' },
				{ id: 3, name: 'Level 3' },
				{ id: 4, name: 'Level 4' },
				{ id: 5, name: 'Level 5' },
				{ id: 6, name: 'Level 6' },
				{ id: 7, name: 'Level 7' },
				{ id: 8, name: 'Level 8' },
				{ id: 9, name: 'Level 9' },
				{ id: 10, name: 'Level 10' }
			];
			this.$scope.$watch(() => {
				return this.difficulty;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.$scope.$emit('selectDifficultyChanged', newVal);
				}
			});
		}

		difficulty;
		difficulties;
	}

	function lbSelectDifficultyDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-input-container>
        			<label>Difficulty & Level</label>
        			<md-select ng-model="selectDifficultyCtrl.difficulty">
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