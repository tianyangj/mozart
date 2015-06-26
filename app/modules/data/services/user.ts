module lilybook.data {
  'use strict';

  export interface IUser {
    uid: any,
    email: string,
    firstname: string,
    lastname: string
  }

  export interface IUserSvc {
    current(): ng.IPromise<IUser>,
    signUp(email: string, password: string, firstname: string, lastname: string): ng.IPromise<IUser>,
    logIn(email: string, password: string): ng.IPromise<IUser>,
    logOut(): ng.IPromise<any>,
    isAuthenticated(): boolean
  }

  export class UserSvc implements IUserSvc {

    static $inject = ['$q'];

    constructor(private $q: ng.IQService) { };

    current() {
      var defer = this.$q.defer();
      var user = Parse.User.current();
      if (user) {
        defer.resolve(<IUser>{
          uid: user.id,
          email: user.get('email'),
          firstname: user.get('firstname'),
          lastname: user.get('lastname')
        });
      } else {
        defer.resolve(null);
      }
      return defer.promise;
    }

    signUp(email: string, password: string, firstname: string, lastname: string) {
      var defer = this.$q.defer();
      Parse.User.signUp(email, password, {
        email: email,
        firstname: firstname,
        lastname: lastname
      }).then((user: Parse.User) => {
        defer.resolve(<IUser>{
          uid: user.id,
          email: user.get('email'),
          firstname: user.get('firstname'),
          lastname: user.get('lastname')
        });
      }, (error) => {
        defer.reject(error);
      });
      return defer.promise;
    }

    logIn(email: string, password: string) {
      var defer = this.$q.defer();
      Parse.User.logIn(email, password).then((user: Parse.User) => {
        defer.resolve(<IUser>{
          uid: user.id,
          email: user.get('email'),
          firstname: user.get('firstname'),
          lastname: user.get('lastname')
        });
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

    isAuthenticated() {
      return Parse.User.current().authenticated();
    }
  }

  lilybook.data.module.service('userSvc', UserSvc);
}