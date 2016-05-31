(function() {
  'use strict';
    angular
    .module('ACME')
    .factory('CookieService', ['$http',function($http){

      //holding data of logged in user

      var USER_DATA = "";

      const setUserData = (user) =>{
        USER_DATA = user;
        return USER_DATA;
      };

      const getUserData = () => {
        var email = getCookie('email')
        return $http.post('/users/getUser', {email:email})
        .then((res)=>{
          setUserData(res.data);
          return USER_DATA;
        })
      };

      //dealing with cookies
      const getEmailFromCookie = ()=>{
        var user = getCookie('email');
        console.log(user);
      };

      const setCookie = (ename)=>{
        var exp = new Date();
        exp.setTime(exp.getTime() + (1*24*60*60*1000))
        var expires = exp.toUTCString();
        document.cookie = "email="+ ename +";" + "expires=" + expires;
      };

      //thanks W3 schools for this function.
      const getCookie = (cName)=>{
        var name = cName + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
      };

      const checkCookie=(cName)=>{
        var checker = getCookie(cName);
        return checker != "" ? true : false;
      };

      const removeCookie=(cName)=>{
        document.cookie = cName+'=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
      }

      const updateUserData = (user)=>{
        return $http.post('users/edit', user).then(function(res){
          setCookie(res.config.data.email);
          return res;
        })
      }

      return {
        setCookie: setCookie,
        getCookie: getCookie,
        checkCookie: checkCookie,
        removeCookie: removeCookie,

        setUserData: setUserData,
        getUserData: getUserData,

        updateUserData: updateUserData
      };

    }]);
}());
