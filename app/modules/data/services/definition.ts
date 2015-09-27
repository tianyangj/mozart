module lilybook.data {

	export interface IDifficulty {
		base: Parse.Object,
		id: string,
		name: string,
		certificate: string
	}

	export interface IDefinitionSvc {
		getDifficulties(): ng.IPromise<IDifficulty[]>
	}

	class DefinitionSvc implements IDefinitionSvc {

		private RCMDB: Parse.Object;

		static $inject = ['$q'];

		constructor(private $q: ng.IQService) {
			this.RCMDB = Parse.Object.extend('RCM');
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
	}

	lilybook.data.module.service('definitionSvc', DefinitionSvc);
}