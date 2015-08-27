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
                this.compositionSvc.getCompositionTypes()
                    .then(function (compositionTypes) {
                    _this.forms = compositionTypes;
                });
                this.sorts = [
                    { id: 0, name: 'Alphabetical' },
                    { id: 1, name: 'Difficulties / Grades' },
                    { id: 2, name: 'Popularity' }
                ];
                this.$scope.$emit('headerUpdateContext', {
                    href: $state.href('app.composers'),
                    name: 'Composers'
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
