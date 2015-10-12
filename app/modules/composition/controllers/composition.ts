module lilybook.composition {

	class CompositionController {

		videos: any[];
		sheet: any;
		pdf;
		next: boolean;
		prev: boolean;

		static $inject = [
			'composition',
			'compositionSvc',
			'videoSvc',
			'sheetSvc',
			'pdfDelegate',
			'$mdDialog',
			'$scope',
			'$state',
			'$timeout'
		];

		constructor(
			public composition: lilybook.data.IComposition,
			private compositionSvc: lilybook.data.ICompositionSvc,
			private videoSvc: lilybook.data.IVideoSvc,
			private sheetSvc: lilybook.data.ISheetSvc,
			private pdfDelegate,
			private $mdDialog,
			private $scope,
			private $state,
			private $timeout
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
					this.pdf = this.pdfDelegate.$getByHandle('pdf-sheet');
					this.pdf.load(sheet.pdfUrl).then(() => {
						this.$timeout(() => {
							this.pdf.goToPage(sheet.firstPage || 1);
							this.updatePaging();
						});
					});
				});
			this.$scope.$emit('headerUpdateContext', {
				href: $state.href('app.composer', { vanity: this.composition.composer.vanity }),
				name: this.composition.composer.shortname
			});
		}

		openVideo(event, video, composition) {
			this.$mdDialog.show({
				templateUrl: 'modules/composition/dialogs/video.html',
				parent: angular.element(document.body),
				targetEvent: event,
				clickOutsideToClose: true,
				locals: { video, composition },
				controller: DialogVideoController,
				controllerAs: 'dialogVideoCtrl'
			});
		}

		nextPage() {
			this.pdf.next();
			this.updatePaging();
		}

		prevPage() {
			this.pdf.prev();
			this.updatePaging();
		}

		private updatePaging() {
			let currentPage = this.pdf.getCurrentPage();
			this.prev = currentPage === this.sheet.firstPage;
			this.next = currentPage === this.sheet.lastPage;
		}
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