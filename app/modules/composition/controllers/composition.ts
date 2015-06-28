module lilybook.composition {
    'use strict';

	class CompositionController {

		static $inject = [
			'composition',
			'compositionSvc',
			'videoSvc',
			'sheetSvc'
		];

		constructor(
			public composition: lilybook.data.IComposition,
			private compositionSvc: lilybook.data.ICompositionSvc,
			private videoSvc: lilybook.data.IVideoSvc,
			private sheetSvc: lilybook.data.ISheetSvc
			) {
			this.videoSvc.getVideos(this.composition)
				.then(videos => {
					this.videos = videos;
					this.videos.forEach(video => {
						video.thumbnail = 'https://img.youtube.com/vi/' + video.sourceId + '/hqdefault.jpg';
					});
				});
			this.sheetSvc.getSheet(this.composition)
				.then(sheet => {
					this.sheet = sheet;
				});
		}

		videos: any[];
		sheet: any;
	}

	module.controller('CompositionController', CompositionController);
}