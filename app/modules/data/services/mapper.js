var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        var MapperSvc = (function () {
            function MapperSvc() {
            }
            MapperSvc.composerMapper = function (composer) {
                return {
                    base: composer,
                    id: composer.id,
                    fullname: composer.get('fullName'),
                    shortname: composer.get('shortName'),
                    bio: composer.get('description'),
                    vanity: composer.get('vanity'),
                    image: composer.get('image') ? composer.get('image').url() : null
                };
            };
            MapperSvc.compositionMapper = function (composition) {
                return {
                    base: composition,
                    id: composition.id,
                    title: composition.get('title'),
                    vanity: composition.get('vanity'),
                    opus: composition.get('opus'),
                    number: composition.get('number'),
                    key: composition.get('key').get('name'),
                    instrumentation: composition.get('instrumentation').get('name'),
                    type: composition.get('type').get('name'),
                    wikipedia: composition.get('wikipedia'),
                    imslp: composition.get('imslp'),
                    composer: composition.get('composer') ? MapperSvc.composerMapper(composition.get('composer')) : null,
                    rcm: composition.get('rcm') ? composition.get('rcm').get('name') : null,
                    abrsm: composition.get('abrsm') ? composition.get('abrsm').get('name') : null,
                    henle: composition.get('henle') ? composition.get('henle').get('name') : null
                };
            };
            MapperSvc.userMapper = function (user) {
                return {
                    uid: user.id,
                    email: user.get('email'),
                    firstname: user.get('firstname'),
                    lastname: user.get('lastname')
                };
            };
            return MapperSvc;
        })();
        data.MapperSvc = MapperSvc;
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
/*angular.module('lilybook').factory('mapperSvc', function() {

    var compositionMapper = function(composition) {
        return {
            base: composition,
            id: composition.id,
            title: composition.get('title'),
            vanity: composition.get('vanity'),
            opus: composition.get('opus'),
            number: composition.get('number'),
            key: composition.get('key').get('name'),
            instrumentation: composition.get('instrumentation').get('name'),
            type: composition.get('type').get('name'),
            wikipedia: composition.get('wikipedia'),
            imslp: composition.get('imslp'),
            composer: composition.get('composer') ? composerMapper(composition.get('composer')) : null,
            rcm: composition.get('rcm') ? composition.get('rcm').get('name') : null,
            abrsm: composition.get('abrsm') ? composition.get('abrsm').get('name') : null,
            henle: composition.get('henle') ? composition.get('henle').get('name') : null
        };
    };

    var composerMapper = function(composer) {
        return {
            base: composer,
            id: composer.id,
            fullname: composer.get('fullName'),
            shortname: composer.get('shortName'),
            bio: composer.get('description'),
            vanity: composer.get('vanity'),
            image: composer.get('image') ? composer.get('image').url() : null
        };
    };

    var videoMapper = function(video) {
        return {
            base: video,
            id: video.id,
            embed: video.get('embed'),
            source: video.get('source'),
            title: video.get('title')
        };
    };

    var sheetMapper = function(sheet) {
        return {
            base: sheet,
            id: sheet.id,
            firstPage: sheet.get('firstPage'),
            lastPage: sheet.get('lastPage'),
            pdfUrl: sheet.get('pdf') ? sheet.get('pdf').url() : null
        };
    };

    return {
        compositionMapper: compositionMapper,
        composerMapper: composerMapper,
        videoMapper: videoMapper,
        sheetMapper: sheetMapper
    };

});*/ 
