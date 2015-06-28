module lilybook.app {
    'use strict';

    export var module = angular.module('lilybook', [
        'ngMaterial',
        'ngMdIcons',
        'ui.router',
        'lilybook.composer',
        'lilybook.composition',
        'lilybook.data',
        'lilybook.home'
    ]);
}