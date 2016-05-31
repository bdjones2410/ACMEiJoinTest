(function() {
  'use strict';

    angular
      .module('ACME')
      .factory('LoginService', ['$http', function($http){
        const url = '/users/login'

        const login = (email, password) => {
          var req = {
            email: email,
            password: password
          }
          return $http.post(url, req)
        }

        return {
          login: login
        };
        
      }])
}());
