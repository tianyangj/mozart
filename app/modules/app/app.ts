module lilybook.app {
    'use strict';

    export var module = angular.module('lilybook', [
        'ngMaterial',
        'ui.router',
        'pdf',
        'youtube-embed',
        'lilybook.component',
        'lilybook.composer',
        'lilybook.composition',
        'lilybook.data',
        'lilybook.discovery',
        'lilybook.home'
    ]);
}