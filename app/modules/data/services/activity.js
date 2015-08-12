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
            ActivityType[ActivityType["Difficulty"] = 4] = "Difficulty";
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
                    defer.resolve(data.MapperSvc.likeCompositionMapper(response));
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
                    defer.resolve(data.MapperSvc.likeCompositionMapper(response));
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            ActivitySvc.prototype.hasLikedComposition = function (fromUser, composition) {
                if (!fromUser) {
                    return this.$q.when(false);
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
            ActivitySvc.prototype.rateDifficulty = function (fromUser, composition, difficulty) {
                if (!fromUser) {
                    return this.$q.reject('AUTH_REQUIRED');
                }
                var defer = this.$q.defer();
                Parse.Cloud.run('rateDifficulty', {
                    type: ActivityType.Difficulty,
                    compositionId: composition.id,
                    difficulty: difficulty
                }).then(function (response) {
                    defer.resolve(data.MapperSvc.difficultyMapper(response));
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            ActivitySvc.prototype.getDifficulty = function (fromUser, composition) {
                var defer = this.$q.defer();
                Parse.Cloud.run('getDifficulty', {
                    type: ActivityType.Difficulty,
                    compositionId: composition.id
                }).then(function (response) {
                    var difficulties = response.map(data.MapperSvc.difficultyMapper);
                    defer.resolve({
                        mine: fromUser ? difficulties.filter(function (difficulty) {
                            return difficulty.fromUser.id === fromUser.id;
                        })[0] : null,
                        all: difficulties
                    });
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
