module lilybook.data {
	'use strict';

	export enum ActivityType {
		Like,
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
		createdAt: Date,
		updatedAt: Date,
		meta?: any
	}

	export interface IActivitySvc {
		create(type: ActivityType, fromUser: IUser, composition: IComposition, meta?: any): ng.IPromise<IActivity>;
		read(type: ActivityType, fromUser: IUser, composition: IComposition): ng.IPromise<IActivity>;
		update(type: ActivityType, fromUser: IUser, composition: IComposition, meta?: any): ng.IPromise<IActivity>;
		delete(type: ActivityType, fromUser: IUser, composition: IComposition): ng.IPromise<IActivity>;
		count(type: ActivityType, composition: IComposition): ng.IPromise<number>;
		list(type: ActivityType, composition: IComposition): ng.IPromise<IActivity[]>;
	}

	class ActivitySvc implements IActivitySvc {

		private ActivityDB: Parse.Object;

		static $inject = ['$q'];

		constructor(private $q: ng.IQService) {
			this.ActivityDB = Parse.Object.extend('Activity');
		};

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

		list(type: ActivityType, composition: IComposition) {
			var defer = this.$q.defer<IActivity[]>();
			var query = new Parse.Query(this.ActivityDB);
			query.equalTo('type', type);
			query.equalTo('composition', composition.base);
			query.find().then((response: Parse.Object[]) => {
				var activities = response.map(MapperSvc.activityMapper);
				defer.resolve(activities);
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}
	}

	lilybook.data.module.service('activitySvc', ActivitySvc);
}