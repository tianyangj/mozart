var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        var VideoSvc = (function () {
            function VideoSvc($q) {
                this.$q = $q;
                this.VideoDB = Parse.Object.extend('Video');
            }
            VideoSvc.prototype.getVideos = function (composition) {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.VideoDB);
                query.equalTo('composition', composition.base);
                query.find().then(function (response) {
                    var videos;
                    videos = response.map(data.MapperSvc.videoMapper);
                    defer.resolve(videos);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            VideoSvc.$inject = ['$q'];
            return VideoSvc;
        })();
        data.module.service('videoSvc', VideoSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
