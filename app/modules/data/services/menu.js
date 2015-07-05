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
