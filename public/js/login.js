(function() {
  'use strict';
  var app = angular.module('candidates', ['toastr', 'angular-ladda']);
  app.config([
    'toastrConfig',
    'laddaProvider',
    function(toastrConfig, laddaProvider) {
      angular.extend(toastrConfig, {
        positionClass: 'toast-top-left',
        progressBar: true,
        tapToDismiss: true,
        preventOpenDuplicates: true
      });
      laddaProvider.setOption({
        style: 'zoom-in'
      });
    }
  ]);
  app.service('loginService', [
    '$http',
    function($http) {
      var self = {
        login: function(loginObj) {
          var promise = $http.post('/login', loginObj).then(function(response) {
            return response;
          });
          return promise;
        },
        validateEmail: function(email) {
          var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return re.test(email);
        }
      };
      return self;
    }
  ]);
  app.controller('loginCtrl', [
    '$scope',
    '$timeout',
    'toastr',
    'loginService',
    function($scope, $timeout, toastr, loginService) {
      $scope.loginObj = {};
      $scope.laddaLoginStatus = false;
      $scope.currentYear = new Date().getFullYear();
      window.location.hash = '';
      $scope.login = function() {
        if ($scope.loginObj.username == undefined) {
          toastr.error('خطأ الرجاء إدخال البريد الالكتروني');
        } else if (
          loginService.validateEmail($scope.loginObj.username) == false &&
          $scope.loginObj.username != undefined
        ) {
          toastr.info('خطأ الرجاء إدخال بريد الكتروني صالح');
        } else if ($scope.loginObj.password == undefined) {
          toastr.error('خطأ الرجاء إدخال كلمة المرور');
        }
        if (
          $scope.loginObj.username != undefined &&
          $scope.loginObj.password != undefined &&
          loginService.validateEmail($scope.loginObj.username)
        ) {
          $scope.laddaLoginStatus = true;
          loginService.login($scope.loginObj).then(
            function(response) {
              if (response.data.login == 1 && response.status == 200) {
                $scope.laddaLoginStatus = false;
                window.location.replace('/home');
              } else if (response.data.login == 2 && response.status == 200) {
                $timeout(function() {
                  $scope.laddaLoginStatus = false;
                  toastr.error('خطأ في البريد الالكتروني و كلمة المرور');
                }, 500);
              } else if (response.data.login == 3 && response.status == 200) {
                $timeout(function() {
                  $scope.laddaLoginStatus = false;
                  toastr.warning('هذا المستخدم موقوف حاليا');
                }, 500);
              }
            },
            function(response) {
              $scope.laddaLoginStatus = false;
              console.log(response.data);
            }
          );
        }
      };
    }
  ]);
})();
