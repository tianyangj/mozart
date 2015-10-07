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
                }, function (newVal) {
                    if (newVal && newVal.id !== _this.formId) {
                        _this.formId = newVal.id;
                        _this.$scope.$emit('selectFormChanged', _this.formId);
                    }
                });
                if (this.$location.search().form) {
                    this.loadData(this.$location.search().form);
                }
            }
            SelectFormController.prototype.onOpen = function () {
                if (!this.forms) {
                    return this.loadData();
                }
            };
            SelectFormController.prototype.onChange = function () {
                this.$location.search('form', this.form.name);
            };
            SelectFormController.prototype.loadData = function (querystring) {
                var _this = this;
                return this.definitionSvc.getForms().then(function (forms) {
                    _this.forms = forms;
                    if (querystring) {
                        _this.forms.forEach(function (form) {
                            if (form.name === querystring) {
                                _this.form = form;
                            }
                        });
                    }
                });
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
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Forms & Genres</label>\n        \t\t\t<md-select\n\t\t\t\t\t\tng-model=\"selectFormCtrl.form\"\n\t\t\t\t\t\tng-model-options=\"{trackBy: '$value.id'}\"\n\t\t\t\t\t\tmd-on-open=\"selectFormCtrl.onOpen()\"\n\t\t\t\t\t\tng-change=\"selectFormCtrl.onChange()\">\n\t\t\t\t\t\t<md-option>All</md-option>\n\t\t\t\t\t\t<md-divider></md-divider>\n          \t\t\t\t<md-option ng-repeat=\"form in selectFormCtrl.forms\" ng-value=\"{{form}}\">{{form.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectFormController,
                controllerAs: 'selectFormCtrl'
            };
        }
        component.module.directive('lbSelectForm', lbSelectFormDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
