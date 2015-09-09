module lilybook.component {
	'use strict';

	class SelectFormController {

		static $inject = [
			'$scope',
			'compositionSvc'
		];

		constructor(
			private $scope,
			private compositionSvc: lilybook.data.ICompositionSvc
			) {
			this.compositionSvc.getCompositionTypes().then((compositionTypes) => {
				this.forms = compositionTypes;
			});
			this.$scope.$watch(() => {
				return this.form;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.$scope.$emit('selectFormChanged', newVal);
				}
			});
		}

		form;
		forms: lilybook.data.ICompositionType[];
	}

	function lbSelectFormDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-input-container>
        			<label>Forms & Genres</label>
        			<md-select ng-model="selectFormCtrl.form">
          				<md-option ng-repeat="form in selectFormCtrl.forms" value="{{form.id}}">{{form.name}}</md-option>
        			</md-select>
      			</md-input-container>
			`,
			controller: SelectFormController,
			controllerAs: 'selectFormCtrl'
		};
	}

	module.directive('lbSelectForm', lbSelectFormDirective);
}