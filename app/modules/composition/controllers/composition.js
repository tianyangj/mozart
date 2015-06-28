var lilybook;
(function (lilybook) {
    var composition;
    (function (composition_1) {
        'use strict';
        var CompositionController = (function () {
            function CompositionController(composition, compositionSvc, videoSvc, sheetSvc) {
                var _this = this;
                this.composition = composition;
                this.compositionSvc = compositionSvc;
                this.videoSvc = videoSvc;
                this.sheetSvc = sheetSvc;
                this.videoSvc.getVideos(this.composition)
                    .then(function (videos) {
                    _this.videos = videos;
                    _this.videos.forEach(function (video) {
                        video.thumbnail = 'https://img.youtube.com/vi/' + video.sourceId + '/hqdefault.jpg';
                    });
                });
                this.sheetSvc.getSheet(this.composition)
                    .then(function (sheet) {
                    _this.sheet = sheet;
                });
            }
            CompositionController.$inject = [
                'composition',
                'compositionSvc',
                'videoSvc',
                'sheetSvc'
            ];
            return CompositionController;
        })();
        composition_1.module.controller('CompositionController', CompositionController);
    })(composition = lilybook.composition || (lilybook.composition = {}));
})(lilybook || (lilybook = {}));
