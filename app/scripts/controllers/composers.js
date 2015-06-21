angular.module('lilybook').controller('ComposersController', function (composerSvc) {
    var _this = this;
    composerSvc.getAllComposers().then(function (composers) {
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
});
