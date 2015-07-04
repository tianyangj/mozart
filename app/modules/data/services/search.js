var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        var SearchSvc = (function () {
            function SearchSvc($q) {
                this.$q = $q;
                this.ComposerDB = Parse.Object.extend('Composer');
            }
            ;
            SearchSvc.prototype.search = function (term) {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.ComposerDB);
                query.matches('fullName', new RegExp(term), 'i');
                query.find().then(function (response) {
                    var results;
                    results = response.map(function (result) {
                        return {
                            value: result.get('vanity'),
                            display: result.get('fullName')
                        };
                    });
                    defer.resolve(results);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            SearchSvc.$inject = ['$q'];
            return SearchSvc;
        })();
        lilybook.data.module.service('searchSvc', SearchSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
