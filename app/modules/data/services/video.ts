module lilybook.data {
	'use strict';

	export interface IVideo {
		base: Parse.Object,
		id: string,
		title: string,
		embed: string,
		source?: string
	}

	export interface IVideoSvc {
		getVideos(composition: IComposition): ng.IPromise<IVideo[]>
	}

	class VideoSvc implements IVideoSvc {

		private VideoDB: Parse.Object;

		static $inject = ['$q'];

		constructor(private $q: ng.IQService) {
			this.VideoDB = Parse.Object.extend('Video');
		}

		getVideos(composition: IComposition) {
			var defer = this.$q.defer();
			var query = new Parse.Query(this.VideoDB);
			query.equalTo('composition', composition.base);
			query.find().then((response: Parse.Object[]) => {
				var videos: IVideo[];
				videos = response.map(MapperSvc.videoMapper);
				defer.resolve(videos);
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}
	}
}