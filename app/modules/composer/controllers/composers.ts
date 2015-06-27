module lilybook.composer {
    'use strict';

	export class ComposersController {

		static $inject = ['composerSvc'];

		constructor(
			private composerSvc: lilybook.data.IComposerSvc
			) {
			this.composerSvc.getComposers(0, 100).then(composers => {
				this.composers = composers.filter(composer => {
					return composer.image !== null;
				});
				this.composers.forEach(composer => {
					if (composer.vanity === 'chopin' || composer.vanity === 'liszt') {
						composer.rowspan = composer.colspan = 2;
					} else {
						composer.rowspan = composer.colspan = 1;
					}
				});
			});
		}

		composers: any[];
	}

	lilybook.composer.module.controller('ComposersController', ComposersController);
}