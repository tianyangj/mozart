var lilybook;
(function (lilybook) {
    var discovery;
    (function (discovery) {
        'use strict';
        var BrowseController = (function () {
            function BrowseController(compositionSvc, composerSvc, $scope) {
                var _this = this;
                this.compositionSvc = compositionSvc;
                this.composerSvc = composerSvc;
                this.$scope = $scope;
                this.compositionSvc.getCompositionTypes()
                    .then(function (compositionTypes) {
                    _this.forms = compositionTypes;
                });
                this.composerSvc.getFeaturedComposers()
                    .then(function (composers) {
                    _this.composers = composers.slice(0, 4);
                });
                this.$scope.$on('selectFormChanged', function (event, selectedForm) {
                    console.log(selectedForm);
                });
            }
            BrowseController.$inject = [
                'compositionSvc',
                'composerSvc',
                '$scope'
            ];
            return BrowseController;
        })();
        lilybook.discovery.module.controller('BrowseController', BrowseController);
    })(discovery = lilybook.discovery || (lilybook.discovery = {}));
})(lilybook || (lilybook = {}));
