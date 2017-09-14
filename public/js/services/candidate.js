(function() {
  'use strict';
  angular.module('candidates').service('candidateService', [
    '$http',
    function($http) {
      var self = {
        newCandidate: function(newCandidate) {
          var promise = $http
            .post('/candidates/', newCandidate)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        getAttachment: function() {
          var promise = $http
            .get('/candidates/getAttachment')
            .then(function(response) {
              return response;
            });
          return promise;
        },
        getCompetition: function() {
          var promise = $http
            .get('/candidates/getCompetition')
            .then(function(response) {
              return response;
            });
          return promise;
        }
      };
      return self;
    }
  ]);
})();
