(function() {
  'use strict';

    angular
    .module('ACME')
    .controller('UserController', ['$scope', '$location', 'CookieService', function($scope, $location, CookieService){
      const vm = this;

      vm.editMode = false;

      if(!CookieService.checkCookie('email')){
        $location.path('/');
      }

      CookieService.getUserData().then((res)=>{
          vm.USER_DATA = res;
        }
      );

      vm.Logout = () => {
        CookieService.removeCookie('email')
        $location.path('/');
      }

      //Edit info view
      vm.toggleEdit = () => {
        if(vm.editMode){
          vm.editMode = false;
        }else{
          vm.editMode = true;
        }
      }

      vm.SaveInfo = () => {
        CookieService.updateUserData(vm.USER_DATA);
        vm.toggleEdit();
      }


    }])
}());
