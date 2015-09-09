var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        var SelectFormController = (function () {
            function SelectFormController($scope, compositionSvc) {
                var _this = this;
                this.$scope = $scope;
                this.compositionSvc = compositionSvc;
                this.compositionSvc.getCompositionTypes().then(function (compositionTypes) {
                    _this.forms = compositionTypes;
                });
                this.$scope.$watch(function () {
                    return _this.form;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.$scope.$emit('selectFormChanged', newVal);
                    }
                });
            }
            SelectFormController.$inject = [
                '$scope',
                'compositionSvc'
            ];
            return SelectFormController;
        })();
        function lbSelectFormDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Forms & Genres</label>\n        \t\t\t<md-select ng-model=\"selectFormCtrl.form\">\n          \t\t\t\t<md-option ng-repeat=\"form in selectFormCtrl.forms\" value=\"{{form.id}}\">{{form.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectFormController,
                controllerAs: 'selectFormCtrl'
            };
        }
        component.module.directive('lbSelectForm', lbSelectFormDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
