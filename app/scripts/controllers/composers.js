angular.module('lilybook').controller('ComposersController', function (composerSvc) {
    var self = this;
    composerSvc.getAllComposers().then(function (composers) {
        self.composers = composers.filter(function (composer) {
            return composer.image;
        });
        self.composers.forEach(function (composer) {
            if (composer.vanity === 'chopin' || composer.vanity === 'liszt') {
                composer.rowspan = composer.colspan = 2;
            }
            else {
                composer.rowspan = composer.colspan = 1;
            }
        });
    });
});
