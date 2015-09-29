module lilybook.component {

	class SelectFormController {

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
				return this.form;
			}, (newVal, oldVal) => {
				if (newVal !== oldVal) {
					this.$scope.$emit('selectFormChanged', newVal.id);
				}
			});
			if (this.$location.search().form) {
				this.definitionSvc.getForms().then((forms) => {
					this.forms = forms;
					forms.forEach((form) => {
						if (form.name === this.$location.search().form) {
							this.form = form;
						}
					});
				});
			}
		}

		onOpen() {
			if (!this.forms) {
				return this.definitionSvc.getForms().then((forms) => {
					this.forms = forms;
				});
			}
		}

		onChange() {
			this.$location.search('form', this.form.name);
		}

		form;
		forms;
	}

	function lbSelectFormDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<md-input-container>
        			<label>Forms & Genres</label>
        			<md-select
						ng-model="selectFormCtrl.form"
						ng-model-options="{trackBy: '$value.id'}"
						md-on-open="selectFormCtrl.onOpen()"
						ng-change="selectFormCtrl.onChange()">
          				<md-option ng-repeat="form in selectFormCtrl.forms" ng-value="{{form}}">{{form.name}}</md-option>
        			</md-select>
      			</md-input-container>
			`,
			controller: SelectFormController,
			controllerAs: 'selectFormCtrl'
		};
	}

	module.directive('lbSelectForm', lbSelectFormDirective);
}