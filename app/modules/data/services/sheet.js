var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        var SheetSvc = (function () {
            function SheetSvc($q) {
                this.$q = $q;
                this.SheetDB = Parse.Object.extend('Sheet');
            }
            SheetSvc.prototype.getSheet = function (composition) {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.SheetDB);
                query.equalTo('composition', composition.base);
                query.first().then(function (response) {
                    if (response) {
                        var sheet;
                        sheet = data.MapperSvc.sheetMapper(response);
                        defer.resolve(sheet);
                    }
                    else {
                        defer.reject('NOT_FOUND');
                    }
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            SheetSvc.$inject = ['$q'];
            return SheetSvc;
        })();
        data.module.service('sheetSvc', SheetSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
