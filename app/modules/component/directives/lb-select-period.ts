module lilybook.component {
	'use strict';

	class SelectPeriodController {

		static $inject = [
			'$scope'
		];

		constructor(
			private $scope
			) {
			this.periods = [
				{ id: 1, name: 'Medieval Period' },
				{ id: 2, name: 'Renaissance Period' },
				{ id: 3, name: 'Baroque Period' },
				{ id: 4, name: 'Classical Period' },
				{ id: 5, name: 'Romantic Period' },
				{ id: 6, name: 'Impressionist Period' },
				{ id: 7, name: 'Modern Period' },
				{ id: 8, name: '20th Century' },
				{ id: 9, name: 'Contemporary' },
				{ id: 10, name: '21st Century' }
			];
			this.$scope.$watch(() => {
				return this.period;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.$scope.$emit('selectPeriodChanged', newVal);
				}
			});
		}

		period;
		periods;
	}

	function lbSelectPeriodDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-input-container>
        			<label>Periods & Eras</label>
        			<md-select ng-model="selectPeriodCtrl.period">
          				<md-option ng-repeat="period in selectPeriodCtrl.periods" value="{{period.id}}">{{period.name}}</md-option>
        			</md-select>
      			</md-input-container>
			`,
			controller: SelectPeriodController,
			controllerAs: 'selectPeriodCtrl'
		};
	}

	module.directive('lbSelectPeriod', lbSelectPeriodDirective);
}