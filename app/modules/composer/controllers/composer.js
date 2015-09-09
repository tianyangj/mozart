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
                this.compositionSvc.getCompositions(composer).then(function (compositions) {
                    _this.compositions = compositions;
                    var compositionGroups = {};
                    compositions.forEach(function (composition) {
                        if (!compositionGroups[composition.type]) {
                            compositionGroups[composition.type] = [];
                        }
                        compositionGroups[composition.type].push(composition);
                    });
                    _this.compositionGroups = compositionGroups;
                });
                this.$scope.$emit('headerUpdateContext', {
                    href: $state.href('app.composers'),
                    name: 'Composers'
                });
                this.$scope.$on('selectFormChanged', function (event, selectedForm) {
                    _this.selectedForm = selectedForm;
                    _this.compositionSvc.getCompositions(composer, _this.selectedForm, _this.selectedSort).then(function (compositions) {
                        _this.compositions = compositions;
                    });
                });
                this.$scope.$on('selectSortChanged', function (event, selectedSort) {
                    _this.selectedSort = selectedSort;
                    _this.compositionSvc.getCompositions(composer, _this.selectedForm, _this.selectedSort).then(function (compositions) {
                        _this.compositions = compositions;
                    });
                });
            }
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
