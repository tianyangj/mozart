module lilybook.composer {
	'use strict';

	export class ComposerToolbarController {

		public static $inject = ['composer'];

		constructor(public composer: any) { }
	}

	lilybook.composer.module.controller('ComposerToolbarController', ComposerToolbarController);
}