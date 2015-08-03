var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        var UserSvc = (function () {
            function UserSvc($q) {
                this.$q = $q;
            }
            ;
            UserSvc.prototype.signUp = function (email, password, firstname, lastname) {
                var defer = this.$q.defer();
                Parse.User.signUp(email, password, {
                    email: email,
                    firstname: firstname,
                    lastname: lastname
                }).then(function (user) {
                    defer.resolve(data.MapperSvc.userMapper(user));
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            UserSvc.prototype.logIn = function (email, password) {
                var defer = this.$q.defer();
                Parse.User.logIn(email, password)
                    .then(function (user) {
                    defer.resolve(data.MapperSvc.userMapper(user));
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            UserSvc.prototype.logOut = function () {
                var defer = this.$q.defer();
                Parse.User.logOut().then(function () {
                    defer.resolve(null);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            UserSvc.prototype.current = function () {
                var user = Parse.User.current();
                if (user) {
                    return data.MapperSvc.userMapper(user);
                }
                return null;
            };
            UserSvc.prototype.isAuthenticated = function () {
                return Parse.User.current() !== null;
            };
            UserSvc.$inject = ['$q'];
            return UserSvc;
        })();
        lilybook.data.module.service('userSvc', UserSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
