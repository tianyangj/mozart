var lilybook;
(function (lilybook) {
    'use strict';
    lilybook.main = angular.module('lilybook', [
        'ngMaterial',
        'ngMdIcons',
        'ui.router',
        'lilybook.composer'
    ]);
})(lilybook || (lilybook = {}));
