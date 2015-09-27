var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        var SelectDifficultyController = (function () {
            function SelectDifficultyController($scope, definitionSvc) {
                var _this = this;
                this.$scope = $scope;
                this.definitionSvc = definitionSvc;
                this.$scope.$watch(function () {
                    return _this.difficultyId;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.$scope.$emit('selectDifficultyChanged', newVal);
                    }
                });
            }
            SelectDifficultyController.prototype.loadDifficulties = function () {
                var _this = this;
                if (!this.difficulties) {
                    return this.definitionSvc.getDifficulties().then(function (difficulties) {
                        _this.difficulties = difficulties;
                    });
                }
            };
            SelectDifficultyController.$inject = [
                '$scope',
                'definitionSvc'
            ];
            return SelectDifficultyController;
        })();
        function lbSelectDifficultyDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Difficulty & Level</label>\n        \t\t\t<md-select ng-model=\"selectDifficultyCtrl.difficultyId\" md-on-open=\"selectDifficultyCtrl.loadDifficulties()\">\n          \t\t\t\t<md-option ng-repeat=\"difficulty in selectDifficultyCtrl.difficulties\" value=\"{{difficulty.id}}\">{{difficulty.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectDifficultyController,
                controllerAs: 'selectDifficultyCtrl'
            };
        }
        component.module.directive('lbSelectDifficulty', lbSelectDifficultyDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
