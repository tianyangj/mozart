var lilybook;
(function (lilybook) {
    var composer;
    (function (composer_1) {
        'use strict';
        var ComposersController = (function () {
            function ComposersController(composerSvc) {
                var _this = this;
                this.composerSvc = composerSvc;
                this.composerSvc.getAllComposers().then(function (composers) {
                    _this.composers = composers.filter(function (composer) {
                        return composer.image;
                    });
                    _this.composers.forEach(function (composer) {
                        if (composer.vanity === 'chopin' || composer.vanity === 'liszt') {
                            composer.rowspan = composer.colspan = 2;
                        }
                        else {
                            composer.rowspan = composer.colspan = 1;
                        }
                    });
                });
            }
            ComposersController.$inject = ['composerSvc'];
            return ComposersController;
        })();
        composer_1.ComposersController = ComposersController;
        lilybook.composer.module.controller('ComposersController', ComposersController);
    })(composer = lilybook.composer || (lilybook.composer = {}));
})(lilybook || (lilybook = {}));
