(function() {
  'use strict';
  angular.module('candidates').service('authService', [
    '$http',
    function($http) {
      var self = {
        authGuard: function() {
          var promise = $http.get('/current_user').then(function(response) {
            return response;
          });
          return promise;
        }
      };
      return self;
    }
  ]);
})();
