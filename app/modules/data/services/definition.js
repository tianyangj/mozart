var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        var DefinitionSvc = (function () {
            function DefinitionSvc($q) {
                this.$q = $q;
                this.RCMDB = Parse.Object.extend('RCM');
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
            DefinitionSvc.$inject = ['$q'];
            return DefinitionSvc;
        })();
        lilybook.data.module.service('definitionSvc', DefinitionSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
