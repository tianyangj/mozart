module lilybook.composition {
    'use strict';

	class CompositionController {

		static $inject = [
			'composition',
			'compositionSvc',
			'videoSvc',
			'sheetSvc',
			'$mdDialog'
		];

		constructor(
			public composition: lilybook.data.IComposition,
			private compositionSvc: lilybook.data.ICompositionSvc,
			private videoSvc: lilybook.data.IVideoSvc,
			private sheetSvc: lilybook.data.ISheetSvc,
			private $mdDialog: any
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

		openVideo = (event, video, composition) => {
			this.$mdDialog.show({
				templateUrl: 'modules/composition/dialogs/video.html',
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true,
				locals: { video, composition },
				controller: DialogVideoController,
				controllerAs: 'dialogVideoCtrl'
			});
		};
	}

	class DialogVideoController {

		static $inject = [
			'$mdDialog',
			'video',
			'composition'
		];

		constructor(
			private $mdDialog: any,
			public video: lilybook.data.IVideo,
			public composition: lilybook.data.IComposition) { }

		close = () => {
			this.$mdDialog.hide();
		};
	}

	module.controller('CompositionController', CompositionController);
}