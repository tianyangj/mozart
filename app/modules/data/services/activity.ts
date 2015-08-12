module lilybook.data {
	'use strict';

	export enum ActivityType {
		LikeComposition,
		Follow,
		Comment,
		Repertoire,
		Difficulty
	}

	export interface IActivityLikeComposition {
		base: Parse.Object,
		id: string,
		type: ActivityType,
		fromUser: IUser,
		composition: IComposition
	}

	export interface IActivitySvc {
		likeComposition(fromUser: IUser, composition: IComposition): ng.IPromise<IActivityLikeComposition>
		unlikeComposition(fromUser: IUser, composition: IComposition): ng.IPromise<IActivityLikeComposition>
		hasLikedComposition(fromUser: IUser, composition: IComposition): ng.IPromise<boolean>
		totalLikedComposition(composition: IComposition): ng.IPromise<number>
		rateDifficulty(fromUser: IUser, composition: IComposition, difficulty: number): ng.IPromise<any>
		getDifficulty(fromUser: IUser, composition: IComposition): ng.IPromise<any>
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
			var defer = this.$q.defer<IActivityLikeComposition>();
			Parse.Cloud.run('likeComposition', {
				type: ActivityType.LikeComposition,
				compositionId: composition.id
			}).then((response: Parse.Object) => {
				defer.resolve(MapperSvc.likeCompositionMapper(response));
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}

		unlikeComposition(fromUser: IUser, composition: IComposition) {
			if (!fromUser) {
				return this.$q.reject('AUTH_REQUIRED');
			}
			var defer = this.$q.defer<IActivityLikeComposition>();
			Parse.Cloud.run('unlikeComposition', {
				type: ActivityType.LikeComposition,
				compositionId: composition.id
			}).then((response: Parse.Object) => {
				defer.resolve(MapperSvc.likeCompositionMapper(response));
			}, (error) => {
				defer.reject(error);
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
				if (response) {
					defer.resolve(true);
				} else {
					defer.resolve(false);
				}
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

		rateDifficulty(fromUser: IUser, composition: IComposition, difficulty: number) {
			if (!fromUser) {
				return this.$q.reject('AUTH_REQUIRED');
			}
			var defer = this.$q.defer();
			Parse.Cloud.run('rateDifficulty', {
				type: ActivityType.Difficulty,
				compositionId: composition.id,
				difficulty: difficulty
			}).then((response: Parse.Object) => {
				defer.resolve(MapperSvc.difficultyMapper(response));
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}

		getDifficulty(fromUser: IUser, composition: IComposition) {
			var defer = this.$q.defer();
			Parse.Cloud.run('getDifficulty', {
				type: ActivityType.Difficulty,
				compositionId: composition.id
			}).then((response: Parse.Object[]) => {
				var difficulties = response.map(MapperSvc.difficultyMapper);
				defer.resolve({
					mine: difficulties.filter((difficulty) => {
						return difficulty.fromUserId === fromUser.id;
					})[0],
					all: difficulties
				});
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}
	}

	lilybook.data.module.service('activitySvc', ActivitySvc);
}