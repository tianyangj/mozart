var lilybook;
(function (lilybook) {
    var discovery;
    (function (discovery) {
        var DiscoveryController = (function () {
            function DiscoveryController(definitionSvc, composerSvc) {
                var _this = this;
                this.definitionSvc = definitionSvc;
                this.composerSvc = composerSvc;
                this.definitionSvc.getForms()
                    .then(function (forms) {
                    _this.forms = forms;
                });
                this.composerSvc.getFeaturedComposers()
                    .then(function (composers) {
                    _this.composers = composers.slice(0, 4);
                });
            }
            DiscoveryController.$inject = [
                'definitionSvc',
                'composerSvc'
            ];
            return DiscoveryController;
        })();
        lilybook.discovery.module.controller('DiscoveryController', DiscoveryController);
    })(discovery = lilybook.discovery || (lilybook.discovery = {}));
})(lilybook || (lilybook = {}));
