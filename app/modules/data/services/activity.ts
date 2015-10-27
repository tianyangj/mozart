module lilybook.data {
	'use strict';

	export enum ActivityType {
		LikeComposition,
		Follow,
		Comment,
		Repertoire,
		Difficulty,
		Todo
	}

	export interface IActivity {
		base: Parse.Object,
		id: string,
		type: ActivityType,
		fromUser: IUser,
		composition: IComposition,
		meta?: any
	}

	export interface IActivityDifficulty extends IActivity {
		composition: IComposition,
		difficulty: number,
		updatedAt: Date
	}

	export interface IActivitySvc {
		rateDifficulty(fromUser: IUser, composition: IComposition, difficulty: number): ng.IPromise<IActivityDifficulty>
		getDifficulty(fromUser: IUser, composition: IComposition): ng.IPromise<{ mine: IActivityDifficulty, all: IActivityDifficulty[] }>
		create(type: ActivityType, fromUser: IUser, composition: IComposition, meta?: any): ng.IPromise<IActivity>;
		read(type: ActivityType, fromUser: IUser, composition: IComposition): ng.IPromise<IActivity>;
		update(type: ActivityType, fromUser: IUser, composition: IComposition, meta?: any): ng.IPromise<IActivity>;
		delete(type: ActivityType, fromUser: IUser, composition: IComposition): ng.IPromise<IActivity>;
		count(type: ActivityType, composition: IComposition): ng.IPromise<number>;
	}

	class ActivitySvc implements IActivitySvc {

		private ActivityDB: Parse.Object;

		static $inject = ['$q'];

		constructor(private $q: ng.IQService) {
			this.ActivityDB = Parse.Object.extend('Activity');
		};

		rateDifficulty(fromUser: IUser, composition: IComposition, difficulty: number) {
			if (!fromUser) {
				return this.$q.reject('AUTH_REQUIRED');
			}
			var defer = this.$q.defer<IActivityDifficulty>();
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
			var defer = this.$q.defer<{ mine: IActivityDifficulty, all: IActivityDifficulty[] }>();
			Parse.Cloud.run('getDifficulty', {
				type: ActivityType.Difficulty,
				compositionId: composition.id
			}).then((response: Parse.Object[]) => {
				console.log('difficulty', response[0])
				var difficulties = response.map(MapperSvc.difficultyMapper);
				console.log(difficulties)
				defer.resolve({
					mine: fromUser ? difficulties.filter((difficulty) => {
						return difficulty.fromUser.id === fromUser.id;
					})[0] : null,
					all: difficulties
				});
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}

		create(type: ActivityType, fromUser: IUser, composition: IComposition, meta?: any) {
			if (!fromUser) {
				return this.$q.reject('AUTH_REQUIRED');
			}
			var defer = this.$q.defer<IActivity>();
			Parse.Cloud.run('createActivity', {
				type: type,
				compositionId: composition.id,
				meta: meta
			}).then((response: Parse.Object) => {
				defer.resolve(MapperSvc.activityMapper(response));
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}

		read(type: ActivityType, fromUser: IUser, composition: IComposition) {
			if (!fromUser) {
				return this.$q.when(null);
			}
			var defer = this.$q.defer<IActivity>();
			Parse.Cloud.run('readActivity', {
				type: type,
				compositionId: composition.id
			}).then((response: Parse.Object) => {
				defer.resolve(MapperSvc.activityMapper(response));
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}

		update(type: ActivityType, fromUser: IUser, composition: IComposition, meta?: any) {
			if (!fromUser) {
				return this.$q.reject('AUTH_REQUIRED');
			}
			var defer = this.$q.defer<IActivity>();
			Parse.Cloud.run('updateActivity', {
				type: type,
				compositionId: composition.id,
				meta: meta
			}).then((response: Parse.Object) => {
				defer.resolve(MapperSvc.activityMapper(response));
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}

		delete(type: ActivityType, fromUser: IUser, composition: IComposition) {
			if (!fromUser) {
				return this.$q.reject('AUTH_REQUIRED');
			}
			var defer = this.$q.defer<IActivity>();
			Parse.Cloud.run('deleteActivity', {
				type: type,
				compositionId: composition.id
			}).then((response: Parse.Object) => {
				defer.resolve(MapperSvc.activityMapper(response));
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}

		count(type: ActivityType, composition: IComposition) {
			var defer = this.$q.defer<number>();
			var query = new Parse.Query(this.ActivityDB);
			query.equalTo('type', type);
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