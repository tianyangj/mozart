var lilybook;
(function (lilybook) {
    var app;
    (function (app) {
        app.module = angular.module('lilybook', [
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
    })(app = lilybook.app || (lilybook.app = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var app;
    (function (app) {
        app.module.config(['$locationProvider', '$mdThemingProvider', '$mdIconProvider',
            function ($locationProvider, $mdThemingProvider, $mdIconProvider) {
                $locationProvider
                    .html5Mode(false)
                    .hashPrefix('!');
                $mdIconProvider
                    .icon("music_library", "./assets/svg/ic_library_music.svg", 24)
                    .icon("arrow_right", "./assets/svg/ic_chevron_right.svg", 24)
                    .icon("close", "./assets/svg/ic_close.svg", 24);
                $mdThemingProvider
                    .theme('default')
                    .primaryPalette('blue')
                    .accentPalette('pink');
            }
        ]);
    })(app = lilybook.app || (lilybook.app = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var app;
    (function (app) {
        app.module.config(['$stateProvider', '$urlRouterProvider',
            function ($stateProvider, $urlRouterProvider) {
                $stateProvider
                    .state('app', {
                    abstract: true,
                    url: '',
                    templateUrl: 'layout.html',
                    controller: 'AppController',
                    controllerAs: 'appCtrl'
                })
                    .state('app.splash', {
                    url: '/',
                    templateUrl: 'modules/app/views/splash.html'
                })
                    .state('app.login', {
                    url: '/login',
                    templateUrl: 'modules/app/views/login.html'
                })
                    .state('app.signup', {
                    url: '/signup',
                    templateUrl: 'modules/app/views/signup.html'
                });
                $urlRouterProvider.otherwise('/');
            }
        ]);
    })(app = lilybook.app || (lilybook.app = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var app;
    (function (app) {
        app.module.run(['$rootScope', '$state', '$stateParams',
            function ($rootScope, $state, $stateParams) {
                Parse.initialize('fHO4LtJRfsdhQBBicYZpdpj3BQHHQCVEiDPkS4ZI', '3gzRyAZnxtQLn1IofC4Layn6cc487e4n5Jin6FzM');
                $rootScope.$state = $state;
                $rootScope.$stateParams = $stateParams;
            }
        ]);
    })(app = lilybook.app || (lilybook.app = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var app;
    (function (app) {
        var AppController = (function () {
            function AppController($rootScope, $state, $mdSidenav, $mdToast, menuSvc, userSvc) {
                var _this = this;
                this.$rootScope = $rootScope;
                this.$state = $state;
                this.$mdSidenav = $mdSidenav;
                this.$mdToast = $mdToast;
                this.menuSvc = menuSvc;
                this.userSvc = userSvc;
                this.menuSvc.getSideNav().then(function (sidenav) {
                    _this.sidenav = sidenav;
                });
                this.$rootScope['user'] = this.userSvc.current();
                this.$rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    _this.$mdSidenav('left').close();
                });
                this.$rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                    console.log('$stateChangeError', error);
                    if (error === 'AUTH_REQUIRED') {
                        _this.$state.go('app.login');
                    }
                });
            }
            AppController.prototype.getSimpleToast = function (message) {
                return this.$mdToast
                    .simple()
                    .content(message)
                    .position('top right');
            };
            ;
            AppController.prototype.signup = function (signupData) {
                var _this = this;
                this.userSvc.signUp(signupData.email, signupData.password, signupData.firstname, signupData.lastname)
                    .then(function (user) {
                    _this.$rootScope['user'] = user;
                    _this.$state.go('app.home');
                }, function (error) {
                    _this.$mdToast.show(_this.getSimpleToast(error.message));
                });
            };
            ;
            AppController.prototype.login = function (loginData) {
                var _this = this;
                this.userSvc.logIn(loginData.email, loginData.password)
                    .then(function (user) {
                    _this.$rootScope['user'] = user;
                    _this.$state.go('app.home');
                }, function (error) {
                    _this.$mdToast.show(_this.getSimpleToast(error.message));
                });
            };
            ;
            AppController.prototype.logout = function () {
                var _this = this;
                this.userSvc.logOut()
                    .then(function () {
                    _this.$rootScope['user'] = null;
                    _this.$state.go('app.splash');
                });
            };
            ;
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
        app.module.controller('AppController', AppController);
    })(app = lilybook.app || (lilybook.app = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        data.module = angular.module('lilybook.data', []);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
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
var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        var ComposerSvc = (function () {
            function ComposerSvc($q) {
                this.$q = $q;
                this.ComposerDB = Parse.Object.extend('Composer');
            }
            ;
            ComposerSvc.prototype.getComposer = function (vanity) {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.ComposerDB);
                query.equalTo('vanity', vanity);
                query.first().then(function (response) {
                    if (response) {
                        var composer = data.MapperSvc.composerMapper(response);
                        defer.resolve(composer);
                    }
                    else {
                        defer.reject('NOT_FOUND');
                    }
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            ComposerSvc.prototype.getComposers = function (skip, limit) {
                if (skip === void 0) { skip = 0; }
                if (limit === void 0) { limit = 10; }
                var defer = this.$q.defer();
                var query = new Parse.Query(this.ComposerDB);
                query.skip(skip);
                query.limit(limit);
                query.ascending('shortName');
                query.find().then(function (response) {
                    var composers = response.map(data.MapperSvc.composerMapper);
                    defer.resolve(composers);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            ComposerSvc.prototype.getFeaturedComposers = function () {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.ComposerDB);
                query.exists('image');
                query.ascending('vanity');
                query.find().then(function (response) {
                    var composers = response.map(data.MapperSvc.composerMapper);
                    defer.resolve(composers);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            ComposerSvc.$inject = ['$q'];
            return ComposerSvc;
        })();
        lilybook.data.module.service('composerSvc', ComposerSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        var CompositionSort = (function () {
            function CompositionSort() {
            }
            CompositionSort.Alphabetical = 1;
            CompositionSort.Difficulty = 2;
            CompositionSort.Popularity = 3;
            return CompositionSort;
        })();
        data.CompositionSort = CompositionSort;
        var CompositionSvc = (function () {
            function CompositionSvc($q) {
                this.$q = $q;
                this.CompositionDB = Parse.Object.extend('Composition');
                this.CompositionTypeDB = Parse.Object.extend('CompositionType');
            }
            CompositionSvc.prototype.getComposition = function (compositionId) {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.CompositionDB);
                query.equalTo('objectId', compositionId);
                query.include('key');
                query.include('type');
                query.include('composer');
                query.include('rcm');
                query.first().then(function (response) {
                    if (response) {
                        var composition = data.MapperSvc.compositionMapper(response);
                        defer.resolve(composition);
                    }
                    else {
                        defer.reject('NOT_FOUND');
                    }
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            CompositionSvc.prototype.getCompositions = function (compositionQuery) {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.CompositionDB);
                query.equalTo('published', true);
                if (compositionQuery.composer) {
                    query.equalTo('composer', compositionQuery.composer.base);
                }
                if (compositionQuery.composerId) {
                    var composer = new Parse.Object('Composer');
                    composer.id = compositionQuery.composerId;
                    query.equalTo('composer', composer);
                }
                if (compositionQuery.typeId) {
                    var type = new Parse.Object('CompositionType');
                    type.id = compositionQuery.typeId;
                    query.equalTo('type', type);
                }
                if (compositionQuery.difficultyId) {
                    var difficulty = new Parse.Object('RCM');
                    difficulty.id = compositionQuery.difficultyId;
                    query.equalTo('rcm', difficulty);
                }
                query.include('key');
                query.include('type');
                query.include('composer');
                query.include('rcm');
                query.ascending(['order', 'title']);
                query.find().then(function (response) {
                    var compositions = response.map(data.MapperSvc.compositionMapper);
                    switch (compositionQuery.sortId) {
                        case 2:
                            compositions.sort(function (a, b) {
                                if (a.rcm.value < b.rcm.value)
                                    return -1;
                                if (a.rcm.value > b.rcm.value)
                                    return 1;
                                return a.order - b.order;
                            });
                            break;
                    }
                    defer.resolve(compositions);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            CompositionSvc.$inject = ['$q'];
            return CompositionSvc;
        })();
        lilybook.data.module.service('compositionSvc', CompositionSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        var DefinitionSvc = (function () {
            function DefinitionSvc($q) {
                this.$q = $q;
                this.RCMDB = Parse.Object.extend('RCM');
                this.CompositionTypeDB = Parse.Object.extend('CompositionType');
                this.cache = {};
            }
            ;
            DefinitionSvc.prototype.getDifficulties = function () {
                var _this = this;
                if (this.cache.difficulties) {
                    return this.$q.when(angular.copy(this.cache.difficulties));
                }
                var defer = this.$q.defer();
                var query = new Parse.Query(this.RCMDB);
                query.ascending('order');
                query.find().then(function (response) {
                    var difficulties = response.map(function (difficulty) {
                        return {
                            base: difficulty,
                            id: difficulty.id,
                            name: difficulty.get('name'),
                            value: difficulty.get('value'),
                            certificate: difficulty.get('certificate')
                        };
                    });
                    _this.cache.difficulties = difficulties;
                    defer.resolve(angular.copy(_this.cache.difficulties));
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            DefinitionSvc.prototype.getForms = function (featured) {
                var _this = this;
                if (featured === void 0) { featured = false; }
                if (this.cache.forms) {
                    return this.$q.when(angular.copy(this.cache.forms));
                }
                var defer = this.$q.defer();
                var query = new Parse.Query(this.CompositionTypeDB);
                if (featured) {
                    query.equalTo('featured', featured);
                }
                query.ascending('order');
                query.find().then(function (response) {
                    var forms = response.map(function (form) {
                        return {
                            base: form,
                            id: form.id,
                            name: form.get('name'),
                            description: form.get('description'),
                            wiki: form.get('wiki'),
                            featured: form.get('featured')
                        };
                    });
                    _this.cache.forms = forms;
                    defer.resolve(angular.copy(_this.cache.forms));
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            DefinitionSvc.$inject = ['$q'];
            return DefinitionSvc;
        })();
        lilybook.data.module.service('definitionSvc', DefinitionSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        var MapperSvc = (function () {
            function MapperSvc() {
            }
            MapperSvc.composerMapper = function (composer) {
                return {
                    base: composer,
                    id: composer.id,
                    fullname: composer.get('fullName'),
                    shortname: composer.get('shortName'),
                    bio: composer.get('description'),
                    vanity: composer.get('vanity'),
                    image: composer.get('image') ? composer.get('image').url() : null
                };
            };
            MapperSvc.compositionMapper = function (composition) {
                return {
                    base: composition,
                    id: composition.id,
                    title: composition.get('title'),
                    description: composition.get('description'),
                    vanity: composition.get('vanity'),
                    catalogue: composition.get('catalogue'),
                    number: composition.get('number'),
                    wikipedia: composition.get('wikipedia'),
                    imslp: composition.get('imslp'),
                    rcm: composition.get('rcm') ? MapperSvc.rcmMapper(composition.get('rcm')) : null,
                    video: composition.get('video'),
                    key: composition.get('key') && composition.get('key').get('name'),
                    type: composition.get('type') && composition.get('type').get('name'),
                    composer: composition.get('composer') ? MapperSvc.composerMapper(composition.get('composer')) : null,
                    order: composition.get('order')
                };
            };
            MapperSvc.userMapper = function (user) {
                return user ? {
                    base: user,
                    id: user.id,
                    email: user.get('email'),
                    firstname: user.get('firstname'),
                    lastname: user.get('lastname')
                } : null;
            };
            MapperSvc.videoMapper = function (video) {
                return {
                    base: video,
                    id: video.id,
                    embed: video.get('embed'),
                    source: video.get('source'),
                    sourceId: video.get('sourceId'),
                    title: video.get('title')
                };
            };
            MapperSvc.sheetMapper = function (sheet) {
                return {
                    base: sheet,
                    id: sheet.id,
                    firstPage: sheet.get('firstPage'),
                    lastPage: sheet.get('lastPage'),
                    pdfUrl: sheet.get('pdf') ? sheet.get('pdf').url() : null
                };
            };
            MapperSvc.likeCompositionMapper = function (activity) {
                return {
                    base: activity,
                    id: activity.id,
                    type: data.ActivityType.LikeComposition,
                    fromUser: activity.get('fromUser'),
                    composition: activity.get('composition')
                };
            };
            MapperSvc.difficultyMapper = function (activity) {
                return {
                    base: activity,
                    id: activity.id,
                    type: data.ActivityType.Difficulty,
                    fromUser: activity.get('fromUser'),
                    composition: activity.get('composition'),
                    difficulty: activity.get('difficulty'),
                    updatedAt: activity.updatedAt
                };
            };
            MapperSvc.rcmMapper = function (rcm) {
                return {
                    base: rcm,
                    id: rcm.id,
                    name: rcm.get('name'),
                    value: rcm.get('value'),
                    certificate: rcm.get('certificate')
                };
            };
            return MapperSvc;
        })();
        data.MapperSvc = MapperSvc;
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        var MenuSvc = (function () {
            function MenuSvc($q) {
                this.$q = $q;
            }
            ;
            MenuSvc.prototype.getSideNav = function () {
                var menu;
                menu = [{
                        subheader: 'Your Hub',
                        items: [
                            { icon: 'home', title: 'Home' },
                            { icon: 'portrait', title: 'Profile' },
                            { icon: 'group', title: 'Friends' },
                            { icon: 'home', title: 'Loved' },
                            { icon: 'home', title: 'History' }
                        ]
                    }, {
                        subheader: 'Discovery',
                        items: [
                            { icon: 'home', title: 'Recommendations', state: 'app.discovery' },
                            { icon: 'portrait', title: 'Composers', state: 'app.composers' },
                            { icon: 'group', title: 'Compositions' }
                        ]
                    }, {
                        subheader: 'Management',
                        items: [
                            { icon: 'home', title: 'Login' },
                            { icon: 'portrait', title: 'Signup' },
                            { icon: 'group', title: 'Account' },
                            { icon: 'group', title: 'Setting' }
                        ]
                    }];
                return this.$q.when(menu);
            };
            MenuSvc.$inject = ['$q'];
            return MenuSvc;
        })();
        lilybook.data.module.service('menuSvc', MenuSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        var SearchSvc = (function () {
            function SearchSvc($q) {
                this.$q = $q;
                this.ComposerDB = Parse.Object.extend('Composer');
            }
            ;
            SearchSvc.prototype.search = function (term) {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.ComposerDB);
                query.matches('fullName', new RegExp(term), 'i');
                query.find().then(function (response) {
                    var results = response.map(function (result) {
                        return {
                            value: result.get('vanity'),
                            display: result.get('fullName')
                        };
                    });
                    defer.resolve(results);
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            SearchSvc.$inject = ['$q'];
            return SearchSvc;
        })();
        lilybook.data.module.service('searchSvc', SearchSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
        'use strict';
        var SheetSvc = (function () {
            function SheetSvc($q) {
                this.$q = $q;
                this.SheetDB = Parse.Object.extend('Sheet');
            }
            SheetSvc.prototype.getSheet = function (composition) {
                var defer = this.$q.defer();
                var query = new Parse.Query(this.SheetDB);
                query.equalTo('composition', composition.base);
                query.first().then(function (response) {
                    if (response) {
                        var sheet = data.MapperSvc.sheetMapper(response);
                        defer.resolve(sheet);
                    }
                    else {
                        defer.reject('NOT_FOUND');
                    }
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            SheetSvc.$inject = ['$q'];
            return SheetSvc;
        })();
        data.module.service('sheetSvc', SheetSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var data;
    (function (data) {
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
                    defer.resolve();
                }, function (error) {
                    defer.reject(error);
                });
                return defer.promise;
            };
            UserSvc.prototype.current = function () {
                return data.MapperSvc.userMapper(Parse.User.current());
            };
            UserSvc.$inject = ['$q'];
            return UserSvc;
        })();
        lilybook.data.module.service('userSvc', UserSvc);
    })(data = lilybook.data || (lilybook.data = {}));
})(lilybook || (lilybook = {}));
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
                    var videos = response.map(data.MapperSvc.videoMapper);
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
var lilybook;
(function (lilybook) {
    var discovery;
    (function (discovery) {
        'use strict';
        discovery.module = angular.module('lilybook.discovery', []);
        discovery.module.config(function ($stateProvider) {
            $stateProvider
                .state('app.browse', {
                url: '/browse?composer&form&level',
                templateUrl: 'modules/discovery/views/browse.html',
                controller: 'BrowseController',
                controllerAs: 'browseCtrl',
                reloadOnSearch: false
            })
                .state('app.discovery', {
                url: '/discover',
                templateUrl: 'modules/discovery/views/discovery.html',
                controller: 'DiscoveryController',
                controllerAs: 'discoveryCtrl'
            });
        });
    })(discovery = lilybook.discovery || (lilybook.discovery = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var discovery;
    (function (discovery) {
        'use strict';
        var BrowseController = (function () {
            function BrowseController(compositionSvc, $scope, $timeout) {
                var _this = this;
                this.compositionSvc = compositionSvc;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.loading = false;
                this.getCompositions();
                this.$scope.$on('selectComposerChanged', function (event, selectedComposer) {
                    _this.selectedComposer = selectedComposer;
                    _this.getCompositions();
                });
                this.$scope.$on('selectFormChanged', function (event, selectedForm) {
                    _this.selectedForm = selectedForm;
                    _this.getCompositions();
                });
                this.$scope.$on('selectDifficultyChanged', function (event, selectedDifficulty) {
                    _this.selectedDifficulty = selectedDifficulty;
                    _this.getCompositions();
                });
                this.$scope.$on('selectSortChanged', function (event, selectedSort) {
                    _this.selectedSort = selectedSort;
                    _this.getCompositions();
                });
            }
            BrowseController.prototype.getCompositions = function () {
                var _this = this;
                this.loading = true;
                this.$timeout.cancel(this.timeout);
                this.timeout = this.$timeout(function () {
                    _this.compositionSvc.getCompositions({
                        composerId: _this.selectedComposer,
                        typeId: _this.selectedForm,
                        difficultyId: _this.selectedDifficulty,
                        sortId: _this.selectedSort
                    }).then(function (compositions) {
                        _this.loading = false;
                        _this.compositions = compositions;
                    });
                }, 600);
            };
            BrowseController.$inject = [
                'compositionSvc',
                '$scope',
                '$timeout'
            ];
            return BrowseController;
        })();
        lilybook.discovery.module.controller('BrowseController', BrowseController);
    })(discovery = lilybook.discovery || (lilybook.discovery = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var discovery;
    (function (discovery) {
        var DiscoveryController = (function () {
            function DiscoveryController(definitionSvc, composerSvc) {
                var _this = this;
                this.definitionSvc = definitionSvc;
                this.composerSvc = composerSvc;
                this.definitionSvc.getForms().then(function (forms) {
                    _this.forms = forms;
                });
                this.composerSvc.getFeaturedComposers().then(function (composers) {
                    _this.composers = composers.slice(0, 4);
                });
            }
            DiscoveryController.$inject = [
                'definitionSvc',
                'composerSvc'
            ];
            return DiscoveryController;
        })();
        lilybook.discovery.module.controller('DiscoveryController', DiscoveryController);
    })(discovery = lilybook.discovery || (lilybook.discovery = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var composer;
    (function (composer) {
        'use strict';
        composer.module = angular.module('lilybook.composer', [
            'ngMaterial',
            'ui.router'
        ]);
        composer.module.config(function ($stateProvider) {
            $stateProvider
                .state('app.composer', {
                url: '/composer/:vanity',
                templateUrl: 'modules/composer/views/composer.html',
                controller: 'ComposerController',
                controllerAs: 'composerCtrl',
                resolve: {
                    composer: ['$stateParams', 'composerSvc', function ($stateParams, composerSvc) {
                            return composerSvc.getComposer($stateParams.vanity);
                        }]
                }
            })
                .state('app.composers', {
                url: '/composers',
                templateUrl: 'modules/composer/views/composers.html',
                controller: 'ComposersController',
                controllerAs: 'composersCtrl'
            });
        });
    })(composer = lilybook.composer || (lilybook.composer = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var composer;
    (function (composer_1) {
        'use strict';
        var ComposerController = (function () {
            function ComposerController(composer, compositionSvc, $scope, $timeout, $state) {
                var _this = this;
                this.composer = composer;
                this.compositionSvc = compositionSvc;
                this.$scope = $scope;
                this.$timeout = $timeout;
                this.$state = $state;
                this.getCompositions();
                this.$scope.$on('selectFormChanged', function (event, selectedForm) {
                    _this.selectedForm = selectedForm;
                    _this.getCompositions();
                });
                this.$scope.$on('selectSortChanged', function (event, selectedSort) {
                    _this.selectedSort = selectedSort;
                    _this.getCompositions();
                });
            }
            ComposerController.prototype.getCompositions = function () {
                var _this = this;
                this.$timeout.cancel(this.timeout);
                this.timeout = this.$timeout(function () {
                    _this.compositionSvc.getCompositions({
                        composer: _this.composer,
                        typeId: _this.selectedForm,
                        sortId: _this.selectedSort
                    }).then(function (compositions) {
                        _this.compositions = compositions;
                    });
                }, 600);
            };
            ComposerController.$inject = [
                'composer',
                'compositionSvc',
                '$scope',
                '$timeout',
                '$state'
            ];
            return ComposerController;
        })();
        lilybook.composer.module.controller('ComposerController', ComposerController);
    })(composer = lilybook.composer || (lilybook.composer = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var composer;
    (function (composer_2) {
        'use strict';
        var ComposersController = (function () {
            function ComposersController(composerSvc) {
                var _this = this;
                this.composerSvc = composerSvc;
                this.composerSvc.getComposers(0, 100).then(function (composers) {
                    _this.composers = composers.filter(function (composer) {
                        return composer.image !== null;
                    });
                    _this.composers.forEach(function (composer) {
                        if (composer.vanity === 'chopin' || composer.vanity === 'liszt') {
                            composer.rowspan = composer.colspan = 2;
                        }
                        else {
                            composer.rowspan = composer.colspan = 1;
                        }
                    });
                });
            }
            ComposersController.$inject = ['composerSvc'];
            return ComposersController;
        })();
        composer_2.ComposersController = ComposersController;
        lilybook.composer.module.controller('ComposersController', ComposersController);
    })(composer = lilybook.composer || (lilybook.composer = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var composition;
    (function (composition) {
        'use strict';
        composition.module = angular.module('lilybook.composition', [
            'ngMaterial',
            'ui.router'
        ]);
        composition.module.config(function ($stateProvider) {
            $stateProvider
                .state('app.composition', {
                url: '/composition/:vanity/:id',
                templateUrl: 'modules/composition/views/composition.html',
                controller: 'CompositionController',
                controllerAs: 'compositionCtrl',
                resolve: {
                    composition: ['$stateParams', 'compositionSvc', function ($stateParams, compositionSvc) {
                            return compositionSvc.getComposition($stateParams.id);
                        }]
                }
            });
        });
    })(composition = lilybook.composition || (lilybook.composition = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var composition;
    (function (composition_1) {
        var CompositionController = (function () {
            function CompositionController(composition, compositionSvc, videoSvc, sheetSvc, pdfDelegate, $mdDialog, $scope, $state, $timeout) {
                var _this = this;
                this.composition = composition;
                this.compositionSvc = compositionSvc;
                this.videoSvc = videoSvc;
                this.sheetSvc = sheetSvc;
                this.pdfDelegate = pdfDelegate;
                this.$mdDialog = $mdDialog;
                this.$scope = $scope;
                this.$state = $state;
                this.$timeout = $timeout;
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
                    _this.pdf = _this.pdfDelegate.$getByHandle('pdf-sheet');
                    _this.pdf.load(sheet.pdfUrl).then(function () {
                        _this.$timeout(function () {
                            _this.pdf.goToPage(sheet.firstPage || 1);
                            _this.updatePaging();
                        }, 1000);
                    });
                });
            }
            CompositionController.prototype.openVideo = function (event, video, composition) {
                this.$mdDialog.show({
                    templateUrl: 'modules/composition/dialogs/video.html',
                    parent: angular.element(document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    locals: { video: video, composition: composition },
                    controller: DialogVideoController,
                    controllerAs: 'dialogVideoCtrl'
                });
            };
            CompositionController.prototype.nextPage = function () {
                this.pdf.next();
                this.updatePaging();
            };
            CompositionController.prototype.prevPage = function () {
                this.pdf.prev();
                this.updatePaging();
            };
            CompositionController.prototype.updatePaging = function () {
                var currentPage = this.pdf.getCurrentPage();
                this.prev = currentPage === this.sheet.firstPage;
                this.next = currentPage === this.sheet.lastPage;
            };
            CompositionController.$inject = [
                'composition',
                'compositionSvc',
                'videoSvc',
                'sheetSvc',
                'pdfDelegate',
                '$mdDialog',
                '$scope',
                '$state',
                '$timeout'
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
var lilybook;
(function (lilybook) {
    var home;
    (function (home) {
        'use strict';
        home.module = angular.module('lilybook.home', [
            'ngMaterial',
            'ui.router'
        ]);
        home.module.config(function ($stateProvider) {
            $stateProvider
                .state('app.home', {
                url: '/home',
                templateUrl: 'modules/home/views/home.html'
            });
        });
    })(home = lilybook.home || (lilybook.home = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        component.module = angular.module('lilybook.component', []);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        function lbHeaderDirective() {
            return {
                restrict: 'E',
                templateUrl: 'modules/component/templates/header.html',
                replace: true,
                scope: {
                    context: '=',
                    logout: '&'
                },
                controller: ['$scope', '$mdSidenav', 'searchSvc', function ($scope, $mdSidenav, searchSvc) {
                        $scope.toggleSidenav = function (sidenavId) {
                            $mdSidenav(sidenavId).toggle();
                        };
                        $scope.search = function (query) {
                            return searchSvc.search(query).then(function (results) {
                                return results;
                            });
                        };
                    }]
            };
        }
        component.module.directive('lbHeader', lbHeaderDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        function lbHeroCompositionDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<div ng-if=\"video\" class=\"hero-composition-video\">\n\t\t\t\t\t<youtube-video video-url=\"video\" player-width=\"'100%'\" player-height=\"'360px'\" player-vars=\"{autoplay:1,showinfo:0}\"></youtube-video>\n\t\t\t\t</div>\n\t\t\t\t<div ng-if=\"!video\" class=\"hero-composition-image\"></div>\n\t\t\t",
                scope: {
                    video: '='
                }
            };
        }
        component.module.directive('lbHeroComposition', lbHeroCompositionDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        function lbHoverDirective() {
            return {
                restrict: 'A',
                scope: {
                    z: '@lbHover'
                },
                link: function (scope, element) {
                    element.addClass('pointer');
                    element.on('mouseenter', function () {
                        element.addClass('md-whiteframe-z' + scope.z);
                    }).on('mouseleave', function () {
                        element.removeClass('md-whiteframe-z' + scope.z);
                    });
                }
            };
        }
        component.module.directive('lbHover', lbHoverDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        function lbLikeCompositionDirective() {
            return {
                restrict: 'E',
                templateUrl: 'modules/component/templates/like-composition.html',
                scope: {
                    composition: '='
                },
                controller: ['$scope', '$rootScope', 'activitySvc', function ($scope, $rootScope, activitySvc) {
                        $scope.onClick = function () {
                            if ($rootScope.user) {
                                if ($scope.liked) {
                                    activitySvc.unlikeComposition($rootScope.user, $scope.composition).then(function () {
                                        $scope.liked = !$scope.liked;
                                        $scope.tooltip = 'I like this';
                                        $scope.total--;
                                    });
                                }
                                else {
                                    activitySvc.likeComposition($rootScope.user, $scope.composition).then(function () {
                                        $scope.liked = !$scope.liked;
                                        $scope.tooltip = 'Unlike';
                                        $scope.total++;
                                    });
                                }
                            }
                        };
                        $rootScope.$watch('user', function (user) {
                            if (user) {
                                activitySvc.hasLikedComposition(user, $scope.composition).then(function (liked) {
                                    $scope.liked = liked;
                                    $scope.tooltip = liked ? 'Unlike' : 'I like this';
                                });
                            }
                            else {
                                $scope.tooltip = 'Login to Like';
                            }
                        });
                        activitySvc.totalLikedComposition($scope.composition).then(function (count) {
                            $scope.total = count;
                        });
                    }]
            };
        }
        component.module.directive('lbLikeComposition', lbLikeCompositionDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        function lbRepertoireDirective() {
            return {
                restrict: 'E',
                templateUrl: 'modules/component/templates/repertoire.html',
                scope: {
                    composition: '='
                },
                controller: ['$scope', '$rootScope', 'activitySvc', function ($scope, $rootScope, activitySvc) {
                    }]
            };
        }
        component.module.directive('lbRepertoire', lbRepertoireDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        var SelectComposerController = (function () {
            function SelectComposerController($scope, $location, composerSvc) {
                this.$scope = $scope;
                this.$location = $location;
                this.composerSvc = composerSvc;
                if (this.$location.search().composer) {
                    this.loadData(this.$location.search().composer);
                }
            }
            SelectComposerController.prototype.onOpen = function () {
                if (!this.composerGroups) {
                    return this.loadData();
                }
            };
            SelectComposerController.prototype.onChange = function () {
                this.$location.search('composer', this.composer.shortname);
                this.$scope.$emit('selectComposerChanged', this.composer.id);
            };
            SelectComposerController.prototype.loadData = function (querystring) {
                var _this = this;
                return this.composerSvc.getComposers(0, 100).then(function (composers) {
                    var vm = {};
                    'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').forEach(function (letter) {
                        vm[letter] = [];
                    });
                    composers.forEach(function (composer) {
                        vm[composer.shortname[0]].push(composer);
                        if (querystring && composer.shortname === querystring) {
                            _this.composer = composer;
                        }
                    });
                    Object.keys(vm).forEach(function (key) {
                        if (!vm[key].length) {
                            delete vm[key];
                        }
                    });
                    _this.composerGroups = vm;
                });
            };
            SelectComposerController.$inject = [
                '$scope',
                '$location',
                'composerSvc'
            ];
            return SelectComposerController;
        })();
        function lbSelectComposerDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Composers</label>\n        \t\t\t<md-select\n\t\t\t\t\t\tng-model=\"selectComposerCtrl.composer\"\n\t\t\t\t\t\tng-model-options=\"{trackBy: '$value.id'}\"\n\t\t\t\t\t\tmd-on-open=\"selectComposerCtrl.onOpen()\"\n\t\t\t\t\t\tng-change=\"selectComposerCtrl.onChange()\">\n\t\t\t\t\t\t<md-option>All</md-option>\n\t\t\t\t\t\t<md-divider></md-divider>\n\t\t\t\t\t\t<md-optgroup label=\"{{letter}}\" ng-repeat=\"(letter, composers) in selectComposerCtrl.composerGroups\">\n\t\t\t\t\t\t\t<md-option ng-repeat=\"composer in composers\" ng-value=\"{{composer}}\">{{composer.fullname}}</md-option>\n\t\t\t\t\t\t </md-optgroup>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectComposerController,
                controllerAs: 'selectComposerCtrl'
            };
        }
        component.module.directive('lbSelectComposer', lbSelectComposerDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        var SelectDifficultyController = (function () {
            function SelectDifficultyController($scope, $location, definitionSvc) {
                this.$scope = $scope;
                this.$location = $location;
                this.definitionSvc = definitionSvc;
                if (this.$location.search().level) {
                    this.loadData(this.$location.search().level);
                }
            }
            SelectDifficultyController.prototype.onOpen = function () {
                if (!this.difficulties) {
                    return this.loadData();
                }
            };
            SelectDifficultyController.prototype.onChange = function () {
                this.$location.search('level', this.difficulty.value);
                this.$scope.$emit('selectDifficultyChanged', this.difficulty.id);
            };
            SelectDifficultyController.prototype.loadData = function (querystring) {
                var _this = this;
                return this.definitionSvc.getDifficulties().then(function (difficulties) {
                    _this.difficulties = difficulties;
                    if (querystring) {
                        _this.difficulties.forEach(function (difficulty) {
                            if (difficulty.value === querystring) {
                                _this.difficulty = difficulty;
                            }
                        });
                    }
                });
            };
            SelectDifficultyController.$inject = [
                '$scope',
                '$location',
                'definitionSvc'
            ];
            return SelectDifficultyController;
        })();
        function lbSelectDifficultyDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Difficulty & Level</label>\n        \t\t\t<md-select\n\t\t\t\t\t\tng-model=\"selectDifficultyCtrl.difficulty\"\n\t\t\t\t\t\tng-model-options=\"{trackBy: '$value.id'}\"\n\t\t\t\t\t\tmd-on-open=\"selectDifficultyCtrl.onOpen()\"\n\t\t\t\t\t\tng-change=\"selectDifficultyCtrl.onChange()\">\n\t\t\t\t\t\t<md-option>All</md-option>\n\t\t\t\t\t\t<md-divider></md-divider>\n          \t\t\t\t<md-option ng-repeat=\"difficulty in selectDifficultyCtrl.difficulties\" ng-value=\"{{difficulty}}\">{{difficulty.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectDifficultyController,
                controllerAs: 'selectDifficultyCtrl'
            };
        }
        component.module.directive('lbSelectDifficulty', lbSelectDifficultyDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        var SelectFormController = (function () {
            function SelectFormController($scope, $location, definitionSvc) {
                this.$scope = $scope;
                this.$location = $location;
                this.definitionSvc = definitionSvc;
                if (this.$location.search().form) {
                    this.loadData(this.$location.search().form);
                }
            }
            SelectFormController.prototype.onOpen = function () {
                if (!this.forms) {
                    return this.loadData();
                }
            };
            SelectFormController.prototype.onChange = function () {
                this.$location.search('form', this.form.name);
                this.$scope.$emit('selectFormChanged', this.form.id);
            };
            SelectFormController.prototype.loadData = function (querystring) {
                var _this = this;
                return this.definitionSvc.getForms().then(function (forms) {
                    _this.forms = forms;
                    if (querystring) {
                        _this.forms.forEach(function (form) {
                            if (form.name === querystring) {
                                _this.form = form;
                            }
                        });
                    }
                });
            };
            SelectFormController.$inject = [
                '$scope',
                '$location',
                'definitionSvc'
            ];
            return SelectFormController;
        })();
        function lbSelectFormDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Forms & Genres</label>\n        \t\t\t<md-select\n\t\t\t\t\t\tng-model=\"selectFormCtrl.form\"\n\t\t\t\t\t\tng-model-options=\"{trackBy: '$value.id'}\"\n\t\t\t\t\t\tmd-on-open=\"selectFormCtrl.onOpen()\"\n\t\t\t\t\t\tng-change=\"selectFormCtrl.onChange()\">\n\t\t\t\t\t\t<md-option>All</md-option>\n\t\t\t\t\t\t<md-divider></md-divider>\n          \t\t\t\t<md-option ng-repeat=\"form in selectFormCtrl.forms\" ng-value=\"{{form}}\">{{form.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectFormController,
                controllerAs: 'selectFormCtrl'
            };
        }
        component.module.directive('lbSelectForm', lbSelectFormDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        var SelectPeriodController = (function () {
            function SelectPeriodController($scope) {
                var _this = this;
                this.$scope = $scope;
                this.periods = [
                    { id: 1, name: 'Medieval Period' },
                    { id: 2, name: 'Renaissance Period' },
                    { id: 3, name: 'Baroque Period' },
                    { id: 4, name: 'Classical Period' },
                    { id: 5, name: 'Romantic Period' },
                    { id: 6, name: 'Impressionist Period' },
                    { id: 7, name: 'Modern Period' },
                    { id: 8, name: '20th Century' },
                    { id: 9, name: 'Contemporary' },
                    { id: 10, name: '21st Century' }
                ];
                this.$scope.$watch(function () {
                    return _this.period;
                }, function (newVal, oldVal) {
                    if (newVal !== oldVal) {
                        _this.$scope.$emit('selectPeriodChanged', newVal);
                    }
                });
            }
            SelectPeriodController.$inject = [
                '$scope'
            ];
            return SelectPeriodController;
        })();
        function lbSelectPeriodDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Periods & Eras</label>\n        \t\t\t<md-select ng-model=\"selectPeriodCtrl.period\">\n          \t\t\t\t<md-option ng-repeat=\"period in selectPeriodCtrl.periods\" value=\"{{period.id}}\">{{period.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectPeriodController,
                controllerAs: 'selectPeriodCtrl'
            };
        }
        component.module.directive('lbSelectPeriod', lbSelectPeriodDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        var SelectSortController = (function () {
            function SelectSortController($scope) {
                var _this = this;
                this.$scope = $scope;
                this.sorts = Object.keys(lilybook.data.CompositionSort).map(function (key) {
                    return {
                        id: lilybook.data.CompositionSort[key],
                        name: key
                    };
                });
                this.sort = this.sorts[0];
                this.$scope.$watch(function () {
                    return _this.sort;
                }, function (newVal) {
                    if (newVal && newVal.id !== _this.sortId) {
                        _this.sortId = newVal.id;
                        _this.$scope.$emit('selectSortChanged', _this.sortId);
                    }
                });
            }
            SelectSortController.$inject = [
                '$scope'
            ];
            return SelectSortController;
        })();
        function lbSelectSortDirective() {
            return {
                restrict: 'E',
                template: "\n\t\t\t\t<md-input-container>\n        \t\t\t<label>Sort By</label>\n        \t\t\t<md-select ng-model=\"selectSortCtrl.sort\" ng-model-options=\"{trackBy: '$value.id'}\">\n          \t\t\t\t<md-option ng-repeat=\"sort in selectSortCtrl.sorts\" ng-value=\"{{sort}}\">{{sort.name}}</md-option>\n        \t\t\t</md-select>\n      \t\t\t</md-input-container>\n\t\t\t",
                controller: SelectSortController,
                controllerAs: 'selectSortCtrl'
            };
        }
        component.module.directive('lbSelectSort', lbSelectSortDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
var lilybook;
(function (lilybook) {
    var component;
    (function (component) {
        'use strict';
        function lbSliderDifficultyDirective() {
            return {
                restrict: 'E',
                templateUrl: 'modules/component/templates/slider-difficulty.html',
                scope: {
                    composition: '='
                },
                controller: ['$scope', '$rootScope', 'activitySvc', function ($scope, $rootScope, activitySvc) {
                        activitySvc.getDifficulty($rootScope.user, $scope.composition).then(function (difficulty) {
                            $scope.mine = difficulty.mine;
                            $scope.all = difficulty.all;
                        });
                        $scope.$watch('mine.difficulty', function (newDifficulty, oldDifficulty) {
                            if (newDifficulty && oldDifficulty && newDifficulty !== oldDifficulty) {
                                activitySvc.rateDifficulty($rootScope.user, $scope.composition, newDifficulty).then(function (difficulty) {
                                    $scope.mine = difficulty;
                                });
                            }
                        });
                    }]
            };
        }
        component.module.directive('lbSliderDifficulty', lbSliderDifficultyDirective);
    })(component = lilybook.component || (lilybook.component = {}));
})(lilybook || (lilybook = {}));
//# sourceMappingURL=app.js.map