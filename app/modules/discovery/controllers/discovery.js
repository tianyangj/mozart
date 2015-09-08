var lilybook;
(function (lilybook) {
    var discovery;
    (function (discovery) {
        'use strict';
        var DiscoveryController = (function () {
            function DiscoveryController(compositionSvc, composerSvc) {
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
            DiscoveryController.$inject = [
                'compositionSvc',
                'composerSvc'
            ];
            return DiscoveryController;
        })();
        lilybook.discovery.module.controller('DiscoveryController', DiscoveryController);
    })(discovery = lilybook.discovery || (lilybook.discovery = {}));
})(lilybook || (lilybook = {}));
