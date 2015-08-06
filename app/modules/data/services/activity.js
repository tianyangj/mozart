var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        (function (ActivityType) {
            ActivityType[ActivityType["LikeComposition"] = 0] = "LikeComposition";
            ActivityType[ActivityType["Follow"] = 1] = "Follow";
            ActivityType[ActivityType["Comment"] = 2] = "Comment";
            ActivityType[ActivityType["Repertoire"] = 3] = "Repertoire";
        })(data.ActivityType || (data.ActivityType = {}));
        var ActivityType = data.ActivityType;
        var ActivitySvc = (function () {
            function ActivitySvc($q) {
                this.$q = $q;
                this.ActivityDB = Parse.Object.extend('Activity');
            }
            ;
            ActivitySvc.prototype.likeComposition = function (fromUser, composition) {
                if (!fromUser) {
                    return this.$q.reject('AUTH_REQUIRED');
                }
                var defer = this.$q.defer();
                Parse.Cloud.run('likeComposition', {
                    type: ActivityType.LikeComposition,
                    compositionId: composition.id
                }).then(function (response) {
                    console.log('likeComposition', response);
                    defer.resolve(response);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            ActivitySvc.prototype.unlikeComposition = function (fromUser, composition) {
                if (!fromUser) {
                    return this.$q.reject('AUTH_REQUIRED');
                }
                var defer = this.$q.defer();
                Parse.Cloud.run('unlikeComposition', {
                    type: ActivityType.LikeComposition,
                    compositionId: composition.id
                }).then(function (response) {
                    console.log('unlikeComposition', response);
                    defer.resolve(response);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            ActivitySvc.prototype.hasLikedComposition = function (fromUser, composition) {
                if (!fromUser) {
                    return this.$q.when(null);
                }
                var defer = this.$q.defer();
                var query = new Parse.Query(this.ActivityDB);
                query.equalTo('type', ActivityType.LikeComposition);
                query.equalTo('fromUser', fromUser.base);
                query.equalTo('composition', composition.base);
                query.first().then(function (response) {
                    if (response) {
                        defer.resolve(true);
                    }
                    else {
                        defer.resolve(false);
                    }
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            ActivitySvc.prototype.totalLikedComposition = function (composition) {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.ActivityDB);
                query.equalTo('type', ActivityType.LikeComposition);
                query.equalTo('composition', composition.base);
                query.count().then(function (count) {
                    defer.resolve(count);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            ActivitySvc.$inject = ['$q'];
            return ActivitySvc;
        })();
        lilybook.data.module.service('activitySvc', ActivitySvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
