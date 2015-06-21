angular.module('lilybook').factory('menuSvc', function ($q) {
    var getSideNav = function () {
        return $q.when([{
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
                    { icon: 'home', title: 'Recommendations' },
                    { icon: 'portrait', title: 'Composers' },
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
            }]);
    };
    return {
        getSideNav: getSideNav
    };
});
