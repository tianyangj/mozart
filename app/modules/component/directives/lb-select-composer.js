var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        var SelectComposerController = (function () {
            function SelectComposerController($scope, composerSvc) {
                var _this = this;
                this.$scope = $scope;
                this.composerSvc = composerSvc;
                this.$scope.$watch(function () {
                    return _this.composerId;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.$scope.$emit('selectComposerChanged', newVal);
                    }
                });
            }
            SelectComposerController.prototype.loadComposers = function () {
                var _this = this;
                if (!this.composerGroups) {
                    return this.composerSvc.getComposers(0, 100).then(function (composers) {
                        var vm = {};
                        'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (letter) {
                            vm[letter] = [];
                        });
                        composers.forEach(function (composer) {
                            vm[composer.shortname[0]].push(composer);
                        });
                        Object.keys(vm).forEach(function (key) {
                            if (!vm[key].length) {
                                delete vm[key];
                            }
                        });
                        _this.composerGroups = vm;
                    });
                }
            };
            SelectComposerController.$inject = [
                '$scope',
                'composerSvc'
            ];
            return SelectComposerController;
        })();
        function lbSelectComposerDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Composers</label>\n        \t\t\t<md-select ng-model=\"selectComposerCtrl.composerId\" md-on-open=\"selectComposerCtrl.loadComposers()\">\n\t\t\t\t\t\t<md-optgroup label=\"{{letter}}\" ng-repeat=\"(letter, composers) in selectComposerCtrl.composerGroups\">\n\t\t\t\t\t\t\t<md-option ng-repeat=\"composer in composers\" value=\"{{composer.id}}\">{{composer.fullname}}</md-option>\n\t\t\t\t\t\t </md-optgroup>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectComposerController,
                controllerAs: 'selectComposerCtrl'
            };
        }
        component.module.directive('lbSelectComposer', lbSelectComposerDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
