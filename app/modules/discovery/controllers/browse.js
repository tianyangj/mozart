var lilybook;
(function (lilybook) {
    var discovery;
    (function (discovery) {
        'use strict';
        var BrowseController = (function () {
            function BrowseController(compositionSvc, $scope) {
                var _this = this;
                this.compositionSvc = compositionSvc;
                this.$scope = $scope;
                this.getCompositions();
                this.$scope.$on('selectComposerChanged', function (event, selectedComposer) {
                    _this.selectedComposer = selectedComposer;
                    _this.getCompositions();
                });
                this.$scope.$on('selectFormChanged', function (event, selectedForm) {
                    _this.selectedForm = selectedForm;
                    _this.getCompositions();
                });
                this.$scope.$on('selectDifficultyChanged', function (event, selectedDifficulty) {
                    _this.selectedDifficulty = selectedDifficulty;
                    _this.getCompositions();
                });
                this.$scope.$on('selectSortChanged', function (event, selectedSort) {
                    _this.selectedSort = selectedSort;
                    _this.getCompositions();
                });
            }
            BrowseController.prototype.getCompositions = function () {
                var _this = this;
                this.compositionSvc.getCompositions({
                    composerId: this.selectedComposer,
                    typeId: this.selectedForm,
                    difficultyId: this.selectedDifficulty,
                    sortId: this.selectedSort
                }).then(function (compositions) {
                    _this.compositions = compositions;
                });
            };
            BrowseController.$inject = [
                'compositionSvc',
                '$scope'
            ];
            return BrowseController;
        })();
        lilybook.discovery.module.controller('BrowseController', BrowseController);
    })(discovery = lilybook.discovery || (lilybook.discovery = {}));
})(lilybook || (lilybook = {}));
