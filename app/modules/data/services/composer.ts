module lilybook.data {
	'use strict';

	export interface IComposer {
		base: Parse.Object,
		id: string,
		fullname: string,
		shortname: string,
		bio: string,
		vanity: string,
		image?: string
	}

	export interface IComposerSvc {
		getComposer(vanity: string): ng.IPromise<IComposer>,
		getComposers(skip?: number, limit?: number): ng.IPromise<IComposer[]>,
		getFeaturedComposers(): ng.IPromise<IComposer[]>
	}

	class ComposerSvc implements IComposerSvc {

		private ComposerDB: Parse.Object;

		static $inject = ['$q'];

		constructor(private $q: ng.IQService) {
			this.ComposerDB = Parse.Object.extend('Composer');
		};

		getComposer(vanity: string) {
			var defer = this.$q.defer<IComposer>();
			var query = new Parse.Query(this.ComposerDB);
			query.equalTo('vanity', vanity);
			query.first().then((response: Parse.Object) => {
				if (response) {
					var composer = MapperSvc.composerMapper(response);
					defer.resolve(composer);
				} else {
					defer.reject('NOT_FOUND');
				}
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}

		getComposers(skip = 0, limit = 10) {
			var defer = this.$q.defer<IComposer[]>();
			var query = new Parse.Query(this.ComposerDB);
			query.skip(skip);
			query.limit(limit);
			query.ascending('shortName');
			query.find().then((response: Parse.Object[]) => {
				var composers = response.map(MapperSvc.composerMapper);
				defer.resolve(composers);
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}

		getFeaturedComposers() {
			var defer = this.$q.defer<IComposer[]>();
			var query = new Parse.Query(this.ComposerDB);
			query.exists('image');
			query.ascending('vanity');
			query.find().then((response: Parse.Object[]) => {
				var composers = response.map(MapperSvc.composerMapper);
				defer.resolve(composers);
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}
	}

	lilybook.data.module.service('composerSvc', ComposerSvc);
}

/*angular.module('lilybook').factory('composerSvc', function($q, mapperSvc) {

	var Composer = Parse.Object.extend('Composer');

	var createComposer = function(composer) {
		var defer = $q.defer();
		var newComposer = new Composer();
		newComposer.set('fullName', composer.fullname);
		newComposer.set('shortName', composer.shortname);
		newComposer.set('description', composer.bio);
		newComposer.set('vanity', composer.vanity);
		//newComposer.set('image', new Parse.File());
		newComposer.save().then(function(result) {
			defer.resolve(mapperSvc.composerMapper(result));
		}, function(error) {
			defer.reject(error);
		});
		return defer.promise;
	};

	var getComposer = function(vanity) {
		var defer = $q.defer();
		var query = new Parse.Query(Composer);
		query.equalTo('vanity', vanity);
		query.first().then(function(result) {
			if (result) {
				defer.resolve(mapperSvc.composerMapper(result));
			} else {
				defer.reject('NOT_FOUND');
			}
		}, function(error) {
			defer.reject(error);
		});
		return defer.promise;
	};

	var getComposers = function(skip, limit) {
		var defer = $q.defer();
		var query = new Parse.Query(Composer);
		query.skip(skip || 0);
		query.limit(limit || 10);
		query.find().then(function(results: any[]) {
			defer.resolve(results.map(mapperSvc.composerMapper));
		}, function(error) {
			defer.reject(error);
		});
		return defer.promise;
	};

	var getFeaturedComposers = function() {
		var defer = $q.defer();
		var query = new Parse.Query(Composer);
		query.exists('image');
		query.ascending('vanity');
		query.limit(3);
		query.find().then(function(results: any[]) {
			defer.resolve(results.map(mapperSvc.composerMapper));
		}, function(error) {
			defer.reject(error);
		});
		return defer.promise;
	};

	var getAllComposers = function() {
		var defer = $q.defer();
		var query = new Parse.Query(Composer);
		query.find().then(function(results: any[]) {
			defer.resolve(results.map(mapperSvc.composerMapper));
		}, function(error) {
			defer.reject(error);
		});
		return defer.promise;
	};

	return {
		createComposer: createComposer,
		getComposer: getComposer,
		getComposers: getComposers,
		getFeaturedComposers: getFeaturedComposers,
		getAllComposers: getAllComposers
	};

});*/