module lilybook.component {
	'use strict';

	function lbHeroCompositionDirective(): ng.IDirective {
		return {
			restrict: 'E',
			templateUrl: 'modules/component/templates/hero-composition.html',
			scope: {
				composition: '='
			}
		};
	}

	module.directive('lbHeroComposition', lbHeroCompositionDirective);
}