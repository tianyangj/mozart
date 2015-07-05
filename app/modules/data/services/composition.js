var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        var CompositionSvc = (function () {
            function CompositionSvc($q) {
                this.$q = $q;
                this.CompositionDB = Parse.Object.extend('Composition');
            }
            ;
            CompositionSvc.prototype.getComposition = function (compositionId) {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.CompositionDB);
                query.equalTo('objectId', compositionId);
                query.include('key');
                query.include('instrumentation');
                query.include('type');
                query.include('rcm');
                query.include('abrsm');
                query.include('henle');
                query.include('composer');
                query.first().then(function (response) {
                    if (response) {
                        var composition;
                        composition = data.MapperSvc.compositionMapper(response);
                        defer.resolve(composition);
                    }
                    else {
                        defer.reject('NOT_FOUND');
                    }
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            CompositionSvc.prototype.getCompositions = function (composer) {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.CompositionDB);
                query.equalTo('composer', composer.base);
                query.include('key');
                query.include('instrumentation');
                query.include('type');
                query.find().then(function (response) {
                    var compositions;
                    compositions = response.map(data.MapperSvc.compositionMapper);
                    defer.resolve(compositions);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            CompositionSvc.$inject = ['$q'];
            return CompositionSvc;
        })();
        lilybook.data.module.service('compositionSvc', CompositionSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
/*angular.module('lilybook').factory('compositionSvc', function($q, mapperSvc) {

    var Composition = Parse.Object.extend('Composition');

    var buildVanity = function(title) {
        var url = title.split(' ').join('_');
        url = url.replace(/,/g, '');
        url = url.replace(/\./g, '');
        url = url.replace(/♯/g, '_sharp');
        url = url.replace(/♭/g, '_flat');
        return url.toLowerCase();
    };

    var getCompositionsByComposer = function(composer) {
        var defer = $q.defer();
        var query = new Parse.Query(Composition);
        query.equalTo('composer', composer.base);
        query.include('key');
        query.include('instrumentation');
        query.include('type');
        query.find().then(function(results: any[]) {
            defer.resolve(results.map(mapperSvc.compositionMapper));
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;
    };

    var getCompositionById = function(id) {
        var defer = $q.defer();
        var query = new Parse.Query(Composition);
        query.equalTo('objectId', id);
        query.include('key');
        query.include('instrumentation');
        query.include('type');
        query.include('rcm');
        query.include('abrsm');
        query.include('henle');
        query.include('composer');
        query.first().then(function(result) {
            if (result) {
                defer.resolve(mapperSvc.compositionMapper(result));
            } else {
                defer.reject('NOT_FOUND');
            }
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;
    };

    var createComposition = function(composition) {
        console.log('create', composition);
        var defer = $q.defer();
        var _composition = new Composition();
        _composition.save({
            title: composition.title,
            vanity: buildVanity(composition.title),
            opus: composition.opus,
            number: composition.number,
            key: composition.key.base,
            instrumentation: composition.instrumentation.base,
            type: composition.type.base,
            wikipedia: composition.wikipedia,
            imslp: composition.imslp,
            rcm: composition.rcm ? composition.rcm.base : null,
            abrsm: composition.abrsm ? composition.abrsm.base : null,
            henle: composition.henle ? composition.henle.base : null,
            composer: composition.composer.base
        }).then(function(result) {
            defer.resolve(mapperSvc.compositionMapper(result));
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;
    };

    var updateComposition = function(composition) {
        console.log('update', composition);
        var defer = $q.defer();
        var query = new Parse.Query(Composition);
        query.equalTo('objectId', composition.id);
        query.first().then(function(_composition: any) {
            _composition.save({
                title: composition.title,
                vanity: buildVanity(composition.title),
                opus: composition.opus,
                number: composition.number,
                key: composition.key.base,
                instrumentation: composition.instrumentation.base,
                type: composition.type.base,
                wikipedia: composition.wikipedia,
                imslp: composition.imslp,
                rcm: composition.rcm ? composition.rcm.base : null,
                abrsm: composition.abrsm ? composition.abrsm.base : null,
                henle: composition.henle ? composition.henle.base : null,
                composer: composition.composer.base
            }).then(function(result) {
                defer.resolve(mapperSvc.compositionMapper(result));
            });
        }, function(error) {
            defer.reject(error);
        });
        return defer.promise;
    };

    return {
        getCompositionsByComposer: getCompositionsByComposer,
        getCompositionById: getCompositionById,
        createComposition: createComposition,
        updateComposition: updateComposition
    };

});*/ 