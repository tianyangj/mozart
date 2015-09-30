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
				this.loadData(this.$location.search().form);
			}
		}

		onOpen() {
			if (!this.forms) {
				return this.loadData();
			}
		}

		onChange() {
			this.$location.search('form', this.form.name);
		}

		loadData(querystring?) {
			return this.definitionSvc.getForms().then((forms) => {
				this.forms = forms;
				if (querystring) {
					this.forms.forEach((form) => {
						if (form.name === querystring) {
							this.form = form;
						}
					});
				}
			});
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
						<md-option>All</md-option>
						<md-divider></md-divider>
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