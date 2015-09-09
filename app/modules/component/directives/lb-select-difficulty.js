var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        var SelectDifficultyController = (function () {
            function SelectDifficultyController($scope) {
                var _this = this;
                this.$scope = $scope;
                this.difficulties = [
                    { id: 1, name: 'Level 1' },
                    { id: 2, name: 'Level 2' },
                    { id: 3, name: 'Level 3' },
                    { id: 4, name: 'Level 4' },
                    { id: 5, name: 'Level 5' },
                    { id: 6, name: 'Level 6' },
                    { id: 7, name: 'Level 7' },
                    { id: 8, name: 'Level 8' },
                    { id: 9, name: 'Level 9' },
                    { id: 10, name: 'Level 10' }
                ];
                this.$scope.$watch(function () {
                    return _this.difficulty;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.$scope.$emit('selectDifficultyChanged', newVal);
                    }
                });
            }
            SelectDifficultyController.$inject = [
                '$scope'
            ];
            return SelectDifficultyController;
        })();
        function lbSelectDifficultyDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Difficulty & Level</label>\n        \t\t\t<md-select ng-model=\"selectDifficultyCtrl.difficulty\">\n          \t\t\t\t<md-option ng-repeat=\"difficulty in selectDifficultyCtrl.difficulties\" value=\"{{difficulty.id}}\">{{difficulty.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectDifficultyController,
                controllerAs: 'selectDifficultyCtrl'
            };
        }
        component.module.directive('lbSelectDifficulty', lbSelectDifficultyDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
