module lilybook.composition {
	'use strict';

	class CompositionToolbarController {

		static $inject = ['composition'];

		constructor(public composition) { }
	}

	lilybook.composition.module.controller('CompositionToolbarController', CompositionToolbarController);
}