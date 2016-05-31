(function() {
  'use strict';
    angular
      .module('ACME')
      .controller('LoginController', ['$scope', '$location', 'LoginService', 'CookieService', function($scope, $location, LoginService, CookieService){

        const vm = this;
        
        //logging in

        vm.login = (email, password) => {
          LoginService.login(email, password)
          .then(
          (res)=>{
            if(res.data.error){
              return console.log(res.data.error);
            }
            vm.setInfo(res.data)
          })
        };

        vm.setInfo = (data)=>{
          vm.setCookie(data.email);
          vm.setUserData(data);
          vm.checkCookie('email');
        };

        //Dealing with cookies and authenticating
        vm.setUserData = (user) =>{
          CookieService.setUserData(user);
        };

        vm.setCookie = (lastName) => {
          CookieService.setCookie(lastName);
        }

        vm.checkCookie = (cName)=>{
          if(CookieService.checkCookie(cName)){
            $location.path("/user");
          }else{
            return false;
          }
        }

        vm.checkCookie('email');

      }])
}());
