module lilybook.component {

	class SelectFormController {

		static $inject = [
			'$scope',
			'definitionSvc'
		];

		constructor(
			private $scope,
			private definitionSvc: lilybook.data.IDefinitionSvc
			) {
			this.$scope.$watch(() => {
				return this.formId;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.$scope.$emit('selectFormChanged', newVal);
				}
			});
		}

		loadForms() {
			if (!this.forms) {
				return this.definitionSvc.getForms().then((forms) => {
					this.forms = forms;
				});
			}
		}

		formId;
		forms;
	}

	function lbSelectFormDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-input-container>
        			<label>Forms & Genres</label>
        			<md-select ng-model="selectFormCtrl.formId" md-on-open="selectFormCtrl.loadForms()">
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