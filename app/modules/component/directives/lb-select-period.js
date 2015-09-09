var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        var SelectPeriodController = (function () {
            function SelectPeriodController($scope) {
                var _this = this;
                this.$scope = $scope;
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
                this.$scope.$watch(function () {
                    return _this.period;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.$scope.$emit('selectPeriodChanged', newVal);
                    }
                });
            }
            SelectPeriodController.$inject = [
                '$scope'
            ];
            return SelectPeriodController;
        })();
        function lbSelectPeriodDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Periods & Eras</label>\n        \t\t\t<md-select ng-model=\"selectPeriodCtrl.period\">\n          \t\t\t\t<md-option ng-repeat=\"period in selectPeriodCtrl.periods\" value=\"{{period.id}}\">{{period.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectPeriodController,
                controllerAs: 'selectPeriodCtrl'
            };
        }
        component.module.directive('lbSelectPeriod', lbSelectPeriodDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
