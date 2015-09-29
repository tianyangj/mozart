var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        var SelectFormController = (function () {
            function SelectFormController($scope, $location, definitionSvc) {
                var _this = this;
                this.$scope = $scope;
                this.$location = $location;
                this.definitionSvc = definitionSvc;
                this.$scope.$watch(function () {
                    return _this.form;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.$scope.$emit('selectFormChanged', newVal.id);
                    }
                });
                if (this.$location.search().form) {
                    this.definitionSvc.getForms().then(function (forms) {
                        _this.forms = forms;
                        forms.forEach(function (form) {
                            if (form.name === _this.$location.search().form) {
                                _this.form = form;
                            }
                        });
                    });
                }
            }
            SelectFormController.prototype.onOpen = function () {
                var _this = this;
                if (!this.forms) {
                    return this.definitionSvc.getForms().then(function (forms) {
                        _this.forms = forms;
                    });
                }
            };
            SelectFormController.prototype.onChange = function () {
                this.$location.search('form', this.form.name);
            };
            SelectFormController.$inject = [
                '$scope',
                '$location',
                'definitionSvc'
            ];
            return SelectFormController;
        })();
        function lbSelectFormDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Forms & Genres</label>\n        \t\t\t<md-select\n\t\t\t\t\t\tng-model=\"selectFormCtrl.form\"\n\t\t\t\t\t\tng-model-options=\"{trackBy: '$value.id'}\"\n\t\t\t\t\t\tmd-on-open=\"selectFormCtrl.onOpen()\"\n\t\t\t\t\t\tng-change=\"selectFormCtrl.onChange()\">\n          \t\t\t\t<md-option ng-repeat=\"form in selectFormCtrl.forms\" ng-value=\"{{form}}\">{{form.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectFormController,
                controllerAs: 'selectFormCtrl'
            };
        }
        component.module.directive('lbSelectForm', lbSelectFormDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
