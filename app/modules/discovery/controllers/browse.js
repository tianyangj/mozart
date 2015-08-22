var lilybook;
(function (lilybook) {
    var discovery;
    (function (discovery) {
        'use strict';
        var BrowseController = (function () {
            function BrowseController(compositionSvc, composerSvc) {
                var _this = this;
                this.compositionSvc = compositionSvc;
                this.composerSvc = composerSvc;
                this.compositionSvc.getCompositionTypes()
                    .then(function (compositionTypes) {
                    _this.forms = compositionTypes;
                });
                this.composerSvc.getFeaturedComposers()
                    .then(function (composers) {
                    _this.composers = composers.slice(0, 4);
                });
            }
            BrowseController.$inject = [
                'compositionSvc',
                'composerSvc'
            ];
            return BrowseController;
        })();
        lilybook.discovery.module.controller('BrowseController', BrowseController);
    })(discovery = lilybook.discovery || (lilybook.discovery = {}));
})(lilybook || (lilybook = {}));
