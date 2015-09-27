var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        var DefinitionSvc = (function () {
            function DefinitionSvc($q) {
                this.$q = $q;
                this.RCMDB = Parse.Object.extend('RCM');
                this.CompositionTypeDB = Parse.Object.extend('CompositionType');
            }
            ;
            DefinitionSvc.prototype.getDifficulties = function () {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.RCMDB);
                query.find().then(function (response) {
                    var difficulties = response.map(function (difficulty) {
                        return {
                            base: difficulty,
                            id: difficulty.id,
                            name: difficulty.get('name'),
                            certificate: difficulty.get('certificate')
                        };
                    });
                    defer.resolve(difficulties);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            DefinitionSvc.prototype.getForms = function (featured) {
                if (featured === void 0) { featured = false; }
                var defer = this.$q.defer();
                var query = new Parse.Query(this.CompositionTypeDB);
                if (featured) {
                    query.equalTo('featured', featured);
                }
                query.ascending('order');
                query.find().then(function (response) {
                    var forms = response.map(function (form) {
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
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            DefinitionSvc.$inject = ['$q'];
            return DefinitionSvc;
        })();
        lilybook.data.module.service('definitionSvc', DefinitionSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
