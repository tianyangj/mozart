module lilybook.composer {
	'use strict';

	class ComposerToolbarController {

		static $inject = ['composer'];

		constructor(public composer) { }
	}

	lilybook.composer.module.controller('ComposerToolbarController', ComposerToolbarController);
}