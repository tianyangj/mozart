var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        var SelectComposerController = (function () {
            function SelectComposerController($scope, $location, composerSvc) {
                this.$scope = $scope;
                this.$location = $location;
                this.composerSvc = composerSvc;
                if (this.$location.search().composer) {
                    this.loadData(this.$location.search().composer);
                }
            }
            SelectComposerController.prototype.onOpen = function () {
                if (!this.composerGroups) {
                    return this.loadData();
                }
            };
            SelectComposerController.prototype.onChange = function () {
                this.$location.search('composer', this.composer.shortname);
                this.$scope.$emit('selectComposerChanged', this.composer.id);
            };
            SelectComposerController.prototype.loadData = function (querystring) {
                var _this = this;
                return this.composerSvc.getComposers(0, 100).then(function (composers) {
                    var vm = {};
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (letter) {
                        vm[letter] = [];
                    });
                    composers.forEach(function (composer) {
                        vm[composer.shortname[0]].push(composer);
                        if (querystring && composer.shortname === querystring) {
                            _this.composer = composer;
                        }
                    });
                    Object.keys(vm).forEach(function (key) {
                        if (!vm[key].length) {
                            delete vm[key];
                        }
                    });
                    _this.composerGroups = vm;
                });
            };
            SelectComposerController.$inject = [
                '$scope',
                '$location',
                'composerSvc'
            ];
            return SelectComposerController;
        })();
        function lbSelectComposerDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Composers</label>\n        \t\t\t<md-select\n\t\t\t\t\t\tng-model=\"selectComposerCtrl.composer\"\n\t\t\t\t\t\tng-model-options=\"{trackBy: '$value.id'}\"\n\t\t\t\t\t\tmd-on-open=\"selectComposerCtrl.onOpen()\"\n\t\t\t\t\t\tng-change=\"selectComposerCtrl.onChange()\">\n\t\t\t\t\t\t<md-option>All</md-option>\n\t\t\t\t\t\t<md-divider></md-divider>\n\t\t\t\t\t\t<md-optgroup label=\"{{letter}}\" ng-repeat=\"(letter, composers) in selectComposerCtrl.composerGroups\">\n\t\t\t\t\t\t\t<md-option ng-repeat=\"composer in composers\" ng-value=\"{{composer}}\">{{composer.fullname}}</md-option>\n\t\t\t\t\t\t </md-optgroup>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectComposerController,
                controllerAs: 'selectComposerCtrl'
            };
        }
        component.module.directive('lbSelectComposer', lbSelectComposerDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
