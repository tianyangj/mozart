var lilybook;
(function (lilybook) {
    var app;
    (function (app) {
        'use strict';
        var AppController = (function () {
            function AppController($rootScope, $state, $mdSidenav, $mdToast, menuSvc, userSvc) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.$mdSidenav = $mdSidenav;
                this.$mdToast = $mdToast;
                this.menuSvc = menuSvc;
                this.userSvc = userSvc;
                this.getSimpleToast = function (message) {
                    return _this.$mdToast
                        .simple()
                        .content(message)
                        .position('top right');
                };
                this.signup = function (signupData) {
                    _this.userSvc.signUp(signupData.email, signupData.password, signupData.firstname, signupData.lastname)
                        .then(function (user) {
                        _this.$rootScope['user'] = user;
                        _this.$state.go('app.home');
                    }, function (error) {
                        _this.$mdToast.show(_this.getSimpleToast(error.message));
                    });
                };
                this.login = function (loginData) {
                    _this.userSvc.logIn(loginData.email, loginData.password)
                        .then(function (user) {
                        _this.$rootScope['user'] = user;
                        _this.$state.go('app.home');
                    }, function (error) {
                        _this.$mdToast.show(_this.getSimpleToast(error.message));
                    });
                };
                this.logout = function () {
                    _this.userSvc.logOut()
                        .then(function () {
                        _this.$rootScope['user'] = null;
                        _this.$state.go('app.splash');
                    });
                };
                this.menuSvc.getSideNav().then(function (sidenav) {
                    _this.sidenav = sidenav;
                });
                this.$rootScope['user'] = this.userSvc.current();
                this.$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    _this.context = null;
                    _this.$mdSidenav('left').close();
                });
                this.$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                    console.log('$stateChangeError', error);
                    if (error === 'AUTH_REQUIRED') {
                        _this.$state.go('app.login');
                    }
                });
                this.$rootScope.$on('headerUpdateContext', function (event, context) {
                    _this.context = context;
                });
            }
            AppController.$inject = [
                '$rootScope',
                '$state',
                '$mdSidenav',
                '$mdToast',
                'menuSvc',
                'userSvc'
            ];
            return AppController;
        })();
        app.AppController = AppController;
        lilybook.app.module.controller('AppController', AppController);
    })(app = lilybook.app || (lilybook.app = {}));
})(lilybook || (lilybook = {}));
