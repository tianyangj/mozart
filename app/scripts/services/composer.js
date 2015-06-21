angular.module('lilybook').factory('composerSvc', function ($q, mapperSvc) {
    var Composer = Parse.Object.extend('Composer');
    var createComposer = function (composer) {
        var defer = $q.defer();
        var newComposer = new Composer();
        newComposer.set('fullName', composer.fullname);
        newComposer.set('shortName', composer.shortname);
        newComposer.set('description', composer.bio);
        newComposer.set('vanity', composer.vanity);
        //newComposer.set('image', new Parse.File());
        newComposer.save().then(function (result) {
            defer.resolve(mapperSvc.composerMapper(result));
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };
    var getComposer = function (vanity) {
        var defer = $q.defer();
        var query = new Parse.Query(Composer);
        query.equalTo('vanity', vanity);
        query.first().then(function (result) {
            if (result) {
                defer.resolve(mapperSvc.composerMapper(result));
            }
            else {
                defer.reject('NOT_FOUND');
            }
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };
    var getComposers = function (skip, limit) {
        var defer = $q.defer();
        var query = new Parse.Query(Composer);
        query.skip(skip || 0);
        query.limit(limit || 10);
        query.find().then(function (results) {
            defer.resolve(results.map(mapperSvc.composerMapper));
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };
    var getFeaturedComposers = function () {
        var defer = $q.defer();
        var query = new Parse.Query(Composer);
        query.exists('image');
        query.ascending('vanity');
        query.limit(3);
        query.find().then(function (results) {
            defer.resolve(results.map(mapperSvc.composerMapper));
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };
    var getAllComposers = function () {
        var defer = $q.defer();
        var query = new Parse.Query(Composer);
        query.find().then(function (results) {
            defer.resolve(results.map(mapperSvc.composerMapper));
        }, function (error) {
            defer.reject(error);
        });
        return defer.promise;
    };
    return {
        createComposer: createComposer,
        getComposer: getComposer,
        getComposers: getComposers,
        getFeaturedComposers: getFeaturedComposers,
        getAllComposers: getAllComposers
    };
});
