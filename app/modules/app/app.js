var lilybook;
(function (lilybook) {
    var app;
    (function (app) {
        'use strict';
        app.module = angular.module('lilybook', [
            'ngMaterial',
            'ngMdIcons',
            'ui.router',
            'youtube-embed',
            'lilybook.composer',
            'lilybook.composition',
            'lilybook.data',
            'lilybook.discovery',
            'lilybook.home'
        ]);
    })(app = lilybook.app || (lilybook.app = {}));
})(lilybook || (lilybook = {}));
