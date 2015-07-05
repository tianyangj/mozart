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
                this.compositionSvc.getCompositionTypes(true)
                    .then(function (compositionTypes) {
                    _this.compositionTypes = compositionTypes;
                });
                this.composerSvc.getComposers(0, 100)
                    .then(function (composers) {
                    _this.composers = composers.filter(function (composer) {
                        return composer.image !== null;
                    });
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
