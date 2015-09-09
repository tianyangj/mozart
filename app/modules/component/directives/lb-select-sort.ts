module lilybook.component {
	'use strict';

	class SelectSortController {

		static $inject = [
			'$scope'
		];

		constructor(
			private $scope
			) {
			this.sorts = [
				{ id: 0, name: 'Alphabetical' },
				{ id: 1, name: 'Difficulty' },
				{ id: 2, name: 'Popularity' }
			];
			this.$scope.$watch(() => {
				return this.sort;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.$scope.$emit('selectSortChanged', newVal);
				}
			});
		}

		sort;
		sorts;
	}

	function lbSelectSortDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-input-container>
        			<label>Sort By</label>
        			<md-select ng-model="selectSortCtrl.sort">
          				<md-option ng-repeat="sort in selectSortCtrl.sorts" value="{{sort.id}}">{{sort.name}}</md-option>
        			</md-select>
      			</md-input-container>
			`,
			controller: SelectSortController,
			controllerAs: 'selectSortCtrl'
		};
	}

	module.directive('lbSelectSort', lbSelectSortDirective);
}