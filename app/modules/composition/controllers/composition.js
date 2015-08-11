var lilybook;
(function (lilybook) {
    var composition;
    (function (composition_1) {
        'use strict';
        var CompositionController = (function () {
            function CompositionController(composition, compositionSvc, videoSvc, sheetSvc, $mdDialog, $scope, $state) {
                var _this = this;
                this.composition = composition;
                this.compositionSvc = compositionSvc;
                this.videoSvc = videoSvc;
                this.sheetSvc = sheetSvc;
                this.$mdDialog = $mdDialog;
                this.$scope = $scope;
                this.$state = $state;
                this.openVideo = function (event, video, composition) {
                    _this.$mdDialog.show({
                        templateUrl: 'modules/composition/dialogs/video.html',
                        parent: angular.element(document.body),
                        targetEvent: event,
                        clickOutsideToClose: true,
                        locals: { video: video, composition: composition },
                        controller: DialogVideoController,
                        controllerAs: 'dialogVideoCtrl'
                    });
                };
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
                this.$scope.$emit('headerUpdateContext', {
                    href: $state.href('app.composer', { vanity: this.composition.composer.vanity }),
                    name: this.composition.composer.shortname
                });
            }
            CompositionController.$inject = [
                'composition',
                'compositionSvc',
                'videoSvc',
                'sheetSvc',
                '$mdDialog',
                '$scope',
                '$state'
            ];
            return CompositionController;
        })();
        var DialogVideoController = (function () {
            function DialogVideoController($mdDialog, video, composition) {
                var _this = this;
                this.$mdDialog = $mdDialog;
                this.video = video;
                this.composition = composition;
                this.close = function () {
                    _this.$mdDialog.hide();
                };
            }
            DialogVideoController.$inject = [
                '$mdDialog',
                'video',
                'composition'
            ];
            return DialogVideoController;
        })();
        composition_1.module.controller('CompositionController', CompositionController);
    })(composition = lilybook.composition || (lilybook.composition = {}));
})(lilybook || (lilybook = {}));
