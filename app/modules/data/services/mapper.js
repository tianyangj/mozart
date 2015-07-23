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
                    description: composition.get('description'),
                    vanity: composition.get('vanity'),
                    opus: composition.get('opus'),
                    number: composition.get('number'),
                    instrumentation: composition.get('instrumentation'),
                    wikipedia: composition.get('wikipedia'),
                    imslp: composition.get('imslp'),
                    rcm: composition.get('rcm'),
                    abrsm: composition.get('abrsm'),
                    henle: composition.get('henle'),
                    key: composition.get('key') && composition.get('key').get('name'),
                    type: composition.get('type') && composition.get('type').get('name'),
                    composer: composition.get('composer') ? MapperSvc.composerMapper(composition.get('composer')) : null
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
            MapperSvc.videoMapper = function (video) {
                return {
                    base: video,
                    id: video.id,
                    embed: video.get('embed'),
                    source: video.get('source'),
                    sourceId: video.get('sourceId'),
                    title: video.get('title')
                };
            };
            MapperSvc.sheetMapper = function (sheet) {
                return {
                    base: sheet,
                    id: sheet.id,
                    firstPage: sheet.get('firstPage'),
                    lastPage: sheet.get('lastPage'),
                    pdfUrl: sheet.get('pdf') ? sheet.get('pdf').url() : null
                };
            };
            return MapperSvc;
        })();
        data.MapperSvc = MapperSvc;
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
