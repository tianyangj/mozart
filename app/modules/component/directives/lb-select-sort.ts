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
			this.$scope.$watch(() => {
				return this.sortId;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.$scope.$emit('selectSortChanged', newVal);
				}
			});
		}

		sortId;
		sorts;
	}

	function lbSelectSortDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-input-container>
        			<label>Sort By</label>
        			<md-select ng-model="selectSortCtrl.sortId">
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