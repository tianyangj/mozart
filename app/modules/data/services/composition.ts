module lilybook.data {
	'use strict';

	export class CompositionSort {
		static Alphabetical = 1;
		static Difficulty = 2;
		static Popularity = 3;
	}

	export interface IComposition {
		base: Parse.Object,
		id: string,
		title: string,
		description: string,
		vanity: string,
		catalogue: string,
		number: number,
		key: string,
		type: string,
		wikipedia: string,
		imslp: string,
		order: number,
		composer: IComposer,
		rcm?: string,
		abrsm?: string,
		henle?: string
	}

	export interface ICompositionQuery {
		composer?: IComposer,
		composerId?: string,
		typeId?: string,
		sortId?: number
	}

	export interface ICompositionSvc {
		getComposition(compositionId: string): ng.IPromise<IComposition>,
		getCompositions(compositionQuery: ICompositionQuery): ng.IPromise<IComposition[]>
	}

	class CompositionSvc implements ICompositionSvc {

		private CompositionDB: Parse.Object;
		private CompositionTypeDB: Parse.Object;

		static $inject = ['$q'];

		constructor(private $q: ng.IQService) {
			this.CompositionDB = Parse.Object.extend('Composition');
			this.CompositionTypeDB = Parse.Object.extend('CompositionType');
		};

		getComposition(compositionId: string) {
			var defer = this.$q.defer<IComposition>();
			var query = new Parse.Query(this.CompositionDB);
			query.equalTo('objectId', compositionId);
			query.include('key');
			query.include('type');
			query.include('composer');
			query.include('rcm');
			query.first().then((response: Parse.Object) => {
				if (response) {
					var composition = MapperSvc.compositionMapper(response);
					defer.resolve(composition);
				} else {
					defer.reject('NOT_FOUND');
				}
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}

		getCompositions(compositionQuery: ICompositionQuery) {
			var defer = this.$q.defer<IComposition[]>();
			var query = new Parse.Query(this.CompositionDB);
			query.equalTo('published', true);
			if (compositionQuery.composer) {
				query.equalTo('composer', compositionQuery.composer.base);
			}
			if (compositionQuery.composerId) {
				var composer = new Parse.Object('Composer');
				composer.id = compositionQuery.composerId;
				query.equalTo('composer', composer);
			}
			if (compositionQuery.typeId) {
				var type = new Parse.Object('CompositionType');
				type.id = compositionQuery.typeId;
				query.equalTo('type', type);
			}
			query.include('key');
			query.include('type');
			query.include('rcm');
			// sorting is done on client side
			query.ascending(['order', 'title']);
			query.find().then((response: Parse.Object[]) => {
				var compositions = response.map(MapperSvc.compositionMapper);
				switch (compositionQuery.sortId) {
					case 2:
						compositions.sort((a, b) => {
							if (a.rcm < b.rcm) return -1;
							if (a.rcm > b.rcm) return 1;
							// otherwise sort by order
							return a.order - b.order;
						});
						break;
				}
				defer.resolve(compositions);
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}
	}

	lilybook.data.module.service('compositionSvc', CompositionSvc);
}

/*angular.module('lilybook').factory('compositionSvc', function($q, mapperSvc) {

	var Composition = Parse.Object.extend('Composition');

	var buildVanity = function(title) {
		var url = title.split(' ').join('_');
		url = url.replace(/,/g, '');
		url = url.replace(/\./g, '');
		url = url.replace(/♯/g, '_sharp');
		url = url.replace(/♭/g, '_flat');
		return url.toLowerCase();
	};

	var getCompositionsByComposer = function(composer) {
		var defer = $q.defer();
		var query = new Parse.Query(Composition);
		query.equalTo('composer', composer.base);
		query.include('key');
		query.include('instrumentation');
		query.include('type');
		query.find().then(function(results: any[]) {
			defer.resolve(results.map(mapperSvc.compositionMapper));
		}, function(error) {
			defer.reject(error);
		});
		return defer.promise;
	};

	var getCompositionById = function(id) {
		var defer = $q.defer();
		var query = new Parse.Query(Composition);
		query.equalTo('objectId', id);
		query.include('key');
		query.include('instrumentation');
		query.include('type');
		query.include('rcm');
		query.include('abrsm');
		query.include('henle');
		query.include('composer');
		query.first().then(function(result) {
			if (result) {
				defer.resolve(mapperSvc.compositionMapper(result));
			} else {
				defer.reject('NOT_FOUND');
			}
		}, function(error) {
			defer.reject(error);
		});
		return defer.promise;
	};

	var createComposition = function(composition) {
		console.log('create', composition);
		var defer = $q.defer();
		var _composition = new Composition();
		_composition.save({
			title: composition.title,
			vanity: buildVanity(composition.title),
			opus: composition.opus,
			number: composition.number,
			key: composition.key.base,
			instrumentation: composition.instrumentation.base,
			type: composition.type.base,
			wikipedia: composition.wikipedia,
			imslp: composition.imslp,
			rcm: composition.rcm ? composition.rcm.base : null,
			abrsm: composition.abrsm ? composition.abrsm.base : null,
			henle: composition.henle ? composition.henle.base : null,
			composer: composition.composer.base
		}).then(function(result) {
			defer.resolve(mapperSvc.compositionMapper(result));
		}, function(error) {
			defer.reject(error);
		});
		return defer.promise;
	};

	var updateComposition = function(composition) {
		console.log('update', composition);
		var defer = $q.defer();
		var query = new Parse.Query(Composition);
		query.equalTo('objectId', composition.id);
		query.first().then(function(_composition: any) {
			_composition.save({
				title: composition.title,
				vanity: buildVanity(composition.title),
				opus: composition.opus,
				number: composition.number,
				key: composition.key.base,
				instrumentation: composition.instrumentation.base,
				type: composition.type.base,
				wikipedia: composition.wikipedia,
				imslp: composition.imslp,
				rcm: composition.rcm ? composition.rcm.base : null,
				abrsm: composition.abrsm ? composition.abrsm.base : null,
				henle: composition.henle ? composition.henle.base : null,
				composer: composition.composer.base
			}).then(function(result) {
				defer.resolve(mapperSvc.compositionMapper(result));
			});
		}, function(error) {
			defer.reject(error);
		});
		return defer.promise;
	};

	return {
		getCompositionsByComposer: getCompositionsByComposer,
		getCompositionById: getCompositionById,
		createComposition: createComposition,
		updateComposition: updateComposition
	};

});*/