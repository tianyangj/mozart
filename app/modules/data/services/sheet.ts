module lilybook.data {
	'use strict';

	export interface ISheet {
		base: Parse.Object,
		id: string,
		firstPage: number,
		lastPage: number,
		pdfUrl?: string
	}

	export interface ISheetSvc {
		getSheet(composition: IComposition): ng.IPromise<ISheet>
	}

	class SheetSvc implements ISheetSvc {

		private SheetDB: Parse.Object;

		static $inject = ['$q'];

		constructor(private $q: ng.IQService) {
			this.SheetDB = Parse.Object.extend('Sheet');
		}

		getSheet(composition: IComposition) {
			var defer = this.$q.defer<ISheet>();
			var query = new Parse.Query(this.SheetDB);
			query.equalTo('composition', composition.base);
			query.first().then((response: Parse.Object) => {
				if (response) {
					var sheet = MapperSvc.sheetMapper(response);
					defer.resolve(sheet);
				} else {
					defer.reject('NOT_FOUND');
				}
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}
	}

	module.service('sheetSvc', SheetSvc);
}