module lilybook.composition {
    'use strict';

	class CompositionController {

		static $inject = [
			'composition',
			'compositionSvc'
		];

		constructor(
			public composition: lilybook.data.IComposition,
			private compositionSvc: lilybook.data.ICompositionSvc
			) { }
	}

	module.controller('CompositionController', CompositionController);
}