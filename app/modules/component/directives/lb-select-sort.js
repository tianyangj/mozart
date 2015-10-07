var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        var SelectSortController = (function () {
            function SelectSortController($scope) {
                var _this = this;
                this.$scope = $scope;
                this.sorts = Object.keys(lilybook.data.CompositionSort).map(function (key) {
                    return {
                        id: lilybook.data.CompositionSort[key],
                        name: key
                    };
                });
                this.sort = this.sorts[0];
                this.$scope.$watch(function () {
                    return _this.sort;
                }, function (newVal) {
                    if (newVal && newVal.id !== _this.sortId) {
                        _this.sortId = newVal.id;
                        _this.$scope.$emit('selectSortChanged', _this.sortId);
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
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Sort By</label>\n        \t\t\t<md-select ng-model=\"selectSortCtrl.sort\" ng-model-options=\"{trackBy: '$value.id'}\">\n          \t\t\t\t<md-option ng-repeat=\"sort in selectSortCtrl.sorts\" ng-value=\"{{sort}}\">{{sort.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectSortController,
                controllerAs: 'selectSortCtrl'
            };
        }
        component.module.directive('lbSelectSort', lbSelectSortDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
