namespace lilybook.data {

  export interface IUser {
    base: Parse.User,
    id: string,
    email: string,
    firstname: string,
    lastname: string
  }

  export interface IUserSvc {
    signUp(email: string, password: string, firstname: string, lastname: string): ng.IPromise<IUser>,
    logIn(email: string, password: string): ng.IPromise<IUser>,
    logOut(): ng.IPromise<any>,
    current(): IUser
  }

  class UserSvc implements IUserSvc {

    static $inject = ['$q'];

    constructor(private $q: ng.IQService) { };

    signUp(email: string, password: string, firstname: string, lastname: string) {
      var defer = this.$q.defer<IUser>();
      Parse.User.signUp(email, password, {
        email: email,
        firstname: firstname,
        lastname: lastname
      }).then((user: Parse.User) => {
        defer.resolve(MapperSvc.userMapper(user));
      }, (error) => {
        defer.reject(error);
      });
      return defer.promise;
    }

    logIn(email: string, password: string) {
      var defer = this.$q.defer<IUser>();
      Parse.User.logIn(email, password)
        .then((user: Parse.User) => {
          defer.resolve(MapperSvc.userMapper(user));
        }, (error) => {
          defer.reject(error);
        });
      return defer.promise;
    }

    logOut() {
      var defer = this.$q.defer();
      Parse.User.logOut().then(() => {
        defer.resolve();
      }, (error) => {
        defer.reject(error);
      });
      return defer.promise;
    }

    current() {
      return MapperSvc.userMapper(Parse.User.current());
    }
  }

  lilybook.data.module.service('userSvc', UserSvc);
}