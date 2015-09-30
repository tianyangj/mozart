module lilybook.component {
	'use strict';

	class SelectSortController {

		static $inject = [
			'$scope'
		];

		constructor(
			private $scope
			) {
			this.sorts = Object.keys(lilybook.data.CompositionSort).map((key) => {
				return {
					id: lilybook.data.CompositionSort[key],
					name: key
				};
			});
			this.sort = this.sorts[0];
			this.$scope.$watch(() => {
				return this.sort;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.$scope.$emit('selectSortChanged', newVal.id);
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
        			<md-select ng-model="selectSortCtrl.sort" ng-model-options="{trackBy: '$value.id'}">
          				<md-option ng-repeat="sort in selectSortCtrl.sorts" ng-value="{{sort}}">{{sort.name}}</md-option>
        			</md-select>
      			</md-input-container>
			`,
			controller: SelectSortController,
			controllerAs: 'selectSortCtrl'
		};
	}

	module.directive('lbSelectSort', lbSelectSortDirective);
}