module lilybook.data {

	export interface IDifficulty {
		base: Parse.Object,
		id: string,
		name: string,
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

		static $inject = ['$q'];

		constructor(private $q: ng.IQService) {
			this.RCMDB = Parse.Object.extend('RCM');
			this.CompositionTypeDB = Parse.Object.extend('CompositionType');
		};

		getDifficulties() {
			var defer = this.$q.defer<IDifficulty[]>();
			var query = new Parse.Query(this.RCMDB);
			query.find().then((response: Parse.Object[]) => {
				var difficulties = response.map((difficulty) => {
					return {
						base: difficulty,
						id: difficulty.id,
						name: difficulty.get('name'),
						certificate: difficulty.get('certificate')
					};
				});
				defer.resolve(difficulties);
			}, (error) => {
				defer.reject(error)
			});
			return defer.promise;
		}

		getForms(featured = false) {
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
				defer.resolve(forms);
			}, (error) => {
				defer.reject(error);
			});
			return defer.promise;
		}
	}

	lilybook.data.module.service('definitionSvc', DefinitionSvc);
}