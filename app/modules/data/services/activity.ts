module lilybook.data {
	'use strict';

	export enum ActivityType {
		LikeComposition,
		Follow,
		Comment,
		Repertoire
	}

	export interface IActivity {
		id: string,
		type: ActivityType,
		fromUser: IUser,
		toUser?: IUser,
		content?: string,
		composition?: IComposition
	}

	export interface IActivitySvc {
		likeComposition(fromUser: IUser, composition: IComposition): ng.IPromise<Parse.Object>
		unlikeComposition(fromUser: IUser, composition: IComposition): ng.IPromise<Parse.Object>
		hasLikedComposition(fromUser: IUser, composition: IComposition): ng.IPromise<Parse.Object>
		totalLikedComposition(composition: IComposition): ng.IPromise<number>
	}

	class ActivitySvc implements IActivitySvc {

		private ActivityDB: Parse.Object;

		static $inject = ['$q'];

		constructor(private $q: ng.IQService) {
			this.ActivityDB = Parse.Object.extend('Activity');
		};

		likeComposition(fromUser: IUser, composition: IComposition) {
			if (!fromUser) {
				return this.$q.reject('AUTH_REQUIRED');
			}
			var defer = this.$q.defer();
			this.hasLikedComposition(fromUser, composition).then((liked) => {
				if (!liked) {
					var activity = new (<any>this.ActivityDB)();
					activity.save({
						type: ActivityType.LikeComposition,
						fromUser: fromUser.base,
						composition: composition.base
					}).then((response: Parse.Object) => {
						defer.resolve(response);
					}, (error) => {
						defer.reject(error);
					})
				} else {
					defer.reject('ALREADY_LIKED');
				}
			});
			return defer.promise;
		}

		unlikeComposition(fromUser: IUser, composition: IComposition) {
			if (!fromUser) {
				return this.$q.reject('AUTH_REQUIRED');
			}
			var defer = this.$q.defer();
			this.hasLikedComposition(fromUser, composition).then((liked) => {
				if (liked) {
					var activity = new (<any>this.ActivityDB)();
					liked.destroy().then((response: Parse.Object) => {
						defer.resolve(response);
					}, (error) => {
						defer.reject(error);
					})
				} else {
					defer.reject('NOT_FOUND');
				}
			});
			return defer.promise;
		}

		hasLikedComposition(fromUser: IUser, composition: IComposition) {
			if (!fromUser) {
				return this.$q.when(null);
			}
			var defer = this.$q.defer();
			var query = new Parse.Query(this.ActivityDB);
			query.equalTo('type', ActivityType.LikeComposition);
			query.equalTo('fromUser', fromUser.base);
			query.equalTo('composition', composition.base);
			query.first().then((response: Parse.Object) => {
				defer.resolve(response);
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}

		totalLikedComposition(composition: IComposition) {
			var defer = this.$q.defer();
			var query = new Parse.Query(this.ActivityDB);
			query.equalTo('type', ActivityType.LikeComposition);
			query.equalTo('composition', composition.base);
			query.count().then((count: number) => {
				defer.resolve(count);
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}
	}

	lilybook.data.module.service('activitySvc', ActivitySvc);
}