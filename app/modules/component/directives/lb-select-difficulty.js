var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        var SelectDifficultyController = (function () {
            function SelectDifficultyController($scope, $location, definitionSvc) {
                this.$scope = $scope;
                this.$location = $location;
                this.definitionSvc = definitionSvc;
                if (this.$location.search().level) {
                    this.loadData(this.$location.search().level);
                }
            }
            SelectDifficultyController.prototype.onOpen = function () {
                if (!this.difficulties) {
                    return this.loadData();
                }
            };
            SelectDifficultyController.prototype.onChange = function () {
                this.$location.search('level', this.difficulty.value);
                this.$scope.$emit('selectDifficultyChanged', this.difficulty.id);
            };
            SelectDifficultyController.prototype.loadData = function (querystring) {
                var _this = this;
                return this.definitionSvc.getDifficulties().then(function (difficulties) {
                    _this.difficulties = difficulties;
                    if (querystring) {
                        _this.difficulties.forEach(function (difficulty) {
                            if (difficulty.value === querystring) {
                                _this.difficulty = difficulty;
                            }
                        });
                    }
                });
            };
            SelectDifficultyController.$inject = [
                '$scope',
                '$location',
                'definitionSvc'
            ];
            return SelectDifficultyController;
        })();
        function lbSelectDifficultyDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Difficulty & Level</label>\n        \t\t\t<md-select\n\t\t\t\t\t\tng-model=\"selectDifficultyCtrl.difficulty\"\n\t\t\t\t\t\tng-model-options=\"{trackBy: '$value.id'}\"\n\t\t\t\t\t\tmd-on-open=\"selectDifficultyCtrl.onOpen()\"\n\t\t\t\t\t\tng-change=\"selectDifficultyCtrl.onChange()\">\n\t\t\t\t\t\t<md-option>All</md-option>\n\t\t\t\t\t\t<md-divider></md-divider>\n          \t\t\t\t<md-option ng-repeat=\"difficulty in selectDifficultyCtrl.difficulties\" ng-value=\"{{difficulty}}\">{{difficulty.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectDifficultyController,
                controllerAs: 'selectDifficultyCtrl'
            };
        }
        component.module.directive('lbSelectDifficulty', lbSelectDifficultyDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
