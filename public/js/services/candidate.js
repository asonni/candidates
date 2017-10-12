(function() {
  'use strict';
  angular.module('candidates').service('candidateService', [
    '$http',
    function($http) {
      var self = {
        // getCandidates: function(election,office,searchValue,limit,page) {
        //   var promise = $http
        //     .get('/candidates/get/'+election+'/'+office+'/'+searchValue+'/'+limit+'/'+page)
        //     .then(function(response) {
        //       return response;
        //     });
        //   return promise;
        // },
        fetchCandidates: function(limit, page) {
          var promise = $http
            .get('/candidates/' + limit + '/' + page)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        getQualification: function() {
          var promise = $http
            .get('/qualifications')
            .then(function(response) {
              return response;
            });
          return promise;
        },
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
        },
        fetchAllElections: function() {
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
