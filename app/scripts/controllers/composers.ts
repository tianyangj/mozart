angular.module('lilybook').controller('ComposersController', function(composerSvc) {

	composerSvc.getAllComposers().then(composers => {
		this.composers = composers.filter(composer => {
			return composer.image;
		});
		this.composers.forEach(composer => {
			if (composer.vanity === 'chopin' || composer.vanity === 'liszt') {
				composer.rowspan = composer.colspan = 2;
			} else {
				composer.rowspan = composer.colspan = 1;
			}
		});
	});
});