(function() {
  'use strict';
    angular
    .module('ACME', [
      'ngRoute',
      'ngMessages'
    ])
    .config(['$routeProvider', function($routeProvider){
      $routeProvider
        .when('/', {
          templateUrl:
          'views/login-view.html',
          controller:'LoginController as LoginCtrl'
        })
        .when('/user', {
          templateUrl:
          'views/profile-view.html',
          controller:'UserController as UserCtrl'
        })
        .otherwise({
          redirectTo: '/404'
        });
    }]);

}());
