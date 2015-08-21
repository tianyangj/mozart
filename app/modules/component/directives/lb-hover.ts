module lilybook.component {
	'use strict';

	function lbHoverDirective(): ng.IDirective {
		return {
			restrict: 'A',
			scope: {
				z: '@lbHover'
			},
			link: (scope: any, element) => {
				element.addClass('pointer');
				element.on('mouseenter', () => {
					element.addClass('md-whiteframe-z' + scope.z);
				}).on('mouseleave', () => {
					element.removeClass('md-whiteframe-z' + scope.z);
				});
			}
		};
	}

	module.directive('lbHover', lbHoverDirective);
}