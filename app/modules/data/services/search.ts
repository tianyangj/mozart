module lilybook.data {
	'use strict';

	export interface ISearch {
		value: string,
		display: string
	}

	export interface ISearchSvc {
		search(term: string): ng.IPromise<ISearch[]>
	}

	class SearchSvc implements ISearchSvc {

		private ComposerDB: Parse.Object;

		static $inject = ['$q'];

		constructor(private $q: ng.IQService) {
			this.ComposerDB = Parse.Object.extend('Composer');
		};

		search(term: string) {
			var defer = this.$q.defer<ISearch[]>();
			var query = new Parse.Query(this.ComposerDB);
			query.matches('fullName', new RegExp(term), 'i');
			query.find().then((response: Parse.Object[]) => {
				var results = response.map((result) => {
					return <ISearch>{
						value: result.get('vanity'),
						display: result.get('fullName')
					};
				});
				defer.resolve(results);
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}
	}

	lilybook.data.module.service('searchSvc', SearchSvc);
}