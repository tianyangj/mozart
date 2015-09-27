var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        var SelectFormController = (function () {
            function SelectFormController($scope, definitionSvc) {
                var _this = this;
                this.$scope = $scope;
                this.definitionSvc = definitionSvc;
                this.$scope.$watch(function () {
                    return _this.formId;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.$scope.$emit('selectFormChanged', newVal);
                    }
                });
            }
            SelectFormController.prototype.loadForms = function () {
                var _this = this;
                if (!this.forms) {
                    return this.definitionSvc.getForms().then(function (forms) {
                        _this.forms = forms;
                    });
                }
            };
            SelectFormController.$inject = [
                '$scope',
                'definitionSvc'
            ];
            return SelectFormController;
        })();
        function lbSelectFormDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Forms & Genres</label>\n        \t\t\t<md-select ng-model=\"selectFormCtrl.formId\" md-on-open=\"selectFormCtrl.loadForms()\">\n          \t\t\t\t<md-option ng-repeat=\"form in selectFormCtrl.forms\" value=\"{{form.id}}\">{{form.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectFormController,
                controllerAs: 'selectFormCtrl'
            };
        }
        component.module.directive('lbSelectForm', lbSelectFormDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
