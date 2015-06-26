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
            UserSvc.prototype.current = function () {
                var defer = this.$q.defer();
                var user = Parse.User.current();
                if (user) {
                    defer.resolve({
                        uid: user.id,
                        email: user.get('email'),
                        firstname: user.get('firstname'),
                        lastname: user.get('lastname')
                    });
                }
                else {
                    defer.resolve(null);
                }
                return defer.promise;
            };
            UserSvc.prototype.signUp = function (email, password, firstname, lastname) {
                var defer = this.$q.defer();
                Parse.User.signUp(email, password, {
                    email: email,
                    firstname: firstname,
                    lastname: lastname
                }).then(function (user) {
                    defer.resolve({
                        uid: user.id,
                        email: user.get('email'),
                        firstname: user.get('firstname'),
                        lastname: user.get('lastname')
                    });
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            UserSvc.prototype.logIn = function (email, password) {
                var defer = this.$q.defer();
                Parse.User.logIn(email, password).then(function (user) {
                    defer.resolve({
                        uid: user.id,
                        email: user.get('email'),
                        firstname: user.get('firstname'),
                        lastname: user.get('lastname')
                    });
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            UserSvc.prototype.logOut = function () {
                var defer = this.$q.defer();
                Parse.User.logOut().then(function () {
                    defer.resolve();
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            UserSvc.prototype.isAuthenticated = function () {
                return Parse.User.current().authenticated();
            };
            UserSvc.$inject = ['$q'];
            return UserSvc;
        })();
        data.UserSvc = UserSvc;
        lilybook.data.module.service('userSvc', UserSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
