var lilybook;
(function (lilybook) {
    var app;
    (function (app) {
        'use strict';
        app.module = angular.module('lilybook', [
            'ngMaterial',
            'ui.router',
            'youtube-embed',
            'lilybook.component',
            'lilybook.composer',
            'lilybook.composition',
            'lilybook.data',
            'lilybook.discovery',
            'lilybook.home'
        ]);
    })(app = lilybook.app || (lilybook.app = {}));
})(lilybook || (lilybook = {}));
