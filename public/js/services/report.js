(function() {
  'use strict';
  angular.module('candidates').service('reportService', [
    '$http',
    function($http) {
      var self = {
        fetchElections: function() {
          var promise = $http.get('/elections').then(function(response) {
            return response;
          });
          return promise;
        }
      };
      return self;
    }
  ]);
})();
