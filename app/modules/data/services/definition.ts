module lilybook.data {

	export interface IDifficulty {
		base: Parse.Object,
		id: string,
		name: string,
		value: string,
		certificate: string
	}

	export interface IForm {
		base: Parse.Object,
		id: string,
		name: string,
		description: string,
		wiki: string,
		featured: boolean
	}

	export interface IDefinitionSvc {
		getDifficulties(): ng.IPromise<IDifficulty[]>,
		getForms(featured?: boolean): ng.IPromise<IForm[]>
	}

	class DefinitionSvc implements IDefinitionSvc {

		private RCMDB: Parse.Object;
		private CompositionTypeDB: Parse.Object;
		private cache;

		static $inject = ['$q'];

		constructor(private $q: ng.IQService) {
			this.RCMDB = Parse.Object.extend('RCM');
			this.CompositionTypeDB = Parse.Object.extend('CompositionType');
			this.cache = {};
		};

		getDifficulties() {
			if (this.cache.difficulties) {
				return this.$q.when(angular.copy(this.cache.difficulties));
			}
			var defer = this.$q.defer<IDifficulty[]>();
			var query = new Parse.Query(this.RCMDB);
			query.ascending('order');
			query.find().then((response: Parse.Object[]) => {
				var difficulties = response.map((difficulty) => {
					return {
						base: difficulty,
						id: difficulty.id,
						name: difficulty.get('name'),
						value: difficulty.get('value'),
						certificate: difficulty.get('certificate')
					};
				});
				this.cache.difficulties = difficulties;
				defer.resolve(angular.copy(this.cache.difficulties));
			}, (error) => {
				defer.reject(error)
			});
			return defer.promise;
		}

		getForms(featured = false) {
			if (this.cache.forms) {
				return this.$q.when(angular.copy(this.cache.forms));
			}
			var defer = this.$q.defer<IForm[]>();
			var query = new Parse.Query(this.CompositionTypeDB);
			if (featured) {
				query.equalTo('featured', featured);
			}
			query.ascending('order');
			query.find().then((response: Parse.Object[]) => {
				var forms = response.map((form) => {
					return {
						base: form,
						id: form.id,
						name: form.get('name'),
						description: form.get('description'),
						wiki: form.get('wiki'),
						featured: form.get('featured')
					};
				});
				this.cache.forms = forms;
				defer.resolve(angular.copy(this.cache.forms));
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}
	}

	lilybook.data.module.service('definitionSvc', DefinitionSvc);
}