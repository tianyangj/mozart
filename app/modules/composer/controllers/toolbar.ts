module lilybook {
	'use strict';

	class ComposerToolbarController {

		public static $inject = ['composer'];

		constructor(public composer: any) { }
	}

	lilybook.composer.controller('ComposerToolbarController', ComposerToolbarController);
}