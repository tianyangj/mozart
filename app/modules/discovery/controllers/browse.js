var lilybook;
(function (lilybook) {
    var discovery;
    (function (discovery) {
        'use strict';
        var BrowseController = (function () {
            function BrowseController(compositionSvc, $scope, $timeout) {
                var _this = this;
                this.compositionSvc = compositionSvc;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.loading = false;
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
                this.loading = true;
                this.$timeout.cancel(this.timeout);
                this.timeout = this.$timeout(function () {
                    _this.compositionSvc.getCompositions({
                        composerId: _this.selectedComposer,
                        typeId: _this.selectedForm,
                        difficultyId: _this.selectedDifficulty,
                        sortId: _this.selectedSort
                    }).then(function (compositions) {
                        _this.loading = false;
                        _this.compositions = compositions;
                    });
                }, 600);
            };
            BrowseController.$inject = [
                'compositionSvc',
                '$scope',
                '$timeout'
            ];
            return BrowseController;
        })();
        lilybook.discovery.module.controller('BrowseController', BrowseController);
    })(discovery = lilybook.discovery || (lilybook.discovery = {}));
})(lilybook || (lilybook = {}));
