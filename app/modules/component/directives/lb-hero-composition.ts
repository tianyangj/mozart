module lilybook.component {

	function lbHeroCompositionDirective(): ng.IDirective {
		return {
			restrict: 'E',
			template: `
				<div ng-if="video" class="hero-composition-video">
					<youtube-video video-url="video" player-width="'100%'" player-height="'360px'" player-vars="{autoplay:1,showinfo:0}"></youtube-video>
				</div>
				<div ng-if="!video" class="hero-composition-image"></div>
			`,
			scope: {
				video: '='
			}
		};
	}

	module.directive('lbHeroComposition', lbHeroCompositionDirective);
}