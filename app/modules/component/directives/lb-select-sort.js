var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        var SelectSortController = (function () {
            function SelectSortController($scope) {
                var _this = this;
                this.$scope = $scope;
                this.sorts = [
                    { id: 0, name: 'Alphabetical' },
                    { id: 1, name: 'Difficulty' },
                    { id: 2, name: 'Popularity' }
                ];
                this.$scope.$watch(function () {
                    return _this.sort;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.$scope.$emit('selectSortChanged', newVal);
                    }
                });
            }
            SelectSortController.$inject = [
                '$scope'
            ];
            return SelectSortController;
        })();
        function lbSelectSortDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Sort By</label>\n        \t\t\t<md-select ng-model=\"selectSortCtrl.sort\">\n          \t\t\t\t<md-option ng-repeat=\"sort in selectSortCtrl.sorts\" value=\"{{sort.id}}\">{{sort.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectSortController,
                controllerAs: 'selectSortCtrl'
            };
        }
        component.module.directive('lbSelectSort', lbSelectSortDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
