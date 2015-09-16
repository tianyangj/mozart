var lilybook;
(function (lilybook) {
    var composer;
    (function (composer_1) {
        'use strict';
        var ComposerController = (function () {
            function ComposerController(composer, compositionSvc, $scope, $state) {
                var _this = this;
                this.composer = composer;
                this.compositionSvc = compositionSvc;
                this.$scope = $scope;
                this.$state = $state;
                this.getCompositions();
                this.$scope.$on('selectFormChanged', function (event, selectedForm) {
                    _this.selectedForm = selectedForm;
                    _this.getCompositions();
                });
                this.$scope.$on('selectSortChanged', function (event, selectedSort) {
                    _this.selectedSort = selectedSort;
                    _this.getCompositions();
                });
            }
            ComposerController.prototype.getCompositions = function () {
                var _this = this;
                this.compositionSvc.getCompositions({
                    composer: this.composer,
                    typeId: this.selectedForm,
                    sortId: this.selectedSort
                }).then(function (compositions) {
                    _this.compositions = compositions;
                });
            };
            ComposerController.$inject = [
                'composer',
                'compositionSvc',
                '$scope',
                '$state'
            ];
            return ComposerController;
        })();
        lilybook.composer.module.controller('ComposerController', ComposerController);
    })(composer = lilybook.composer || (lilybook.composer = {}));
})(lilybook || (lilybook = {}));
