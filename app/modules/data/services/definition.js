var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        var DefinitionSvc = (function () {
            function DefinitionSvc($q) {
                this.$q = $q;
                this.RCMDB = Parse.Object.extend('RCM');
                this.CompositionTypeDB = Parse.Object.extend('CompositionType');
                this.cache = {};
            }
            ;
            DefinitionSvc.prototype.getDifficulties = function () {
                var _this = this;
                if (this.cache.difficulties) {
                    return this.$q.when(this.cache.difficulties);
                }
                var defer = this.$q.defer();
                var query = new Parse.Query(this.RCMDB);
                query.ascending('order');
                query.find().then(function (response) {
                    var difficulties = response.map(function (difficulty) {
                        return {
                            base: difficulty,
                            id: difficulty.id,
                            name: difficulty.get('name'),
                            value: difficulty.get('value'),
                            certificate: difficulty.get('certificate')
                        };
                    });
                    _this.cache.difficulties = difficulties;
                    defer.resolve(difficulties);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            DefinitionSvc.prototype.getForms = function (featured) {
                var _this = this;
                if (featured === void 0) { featured = false; }
                if (this.cache.forms) {
                    return this.$q.when(this.cache.forms);
                }
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
                    _this.cache.forms = forms;
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
