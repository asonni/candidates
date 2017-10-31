(function() {
  'use strict';
  angular.module('candidates').service('candidateService', [
    '$http',
    function($http) {
      var self = {
        getAllCandidatesBySearchValue: function(searchValue, limit, page) {
          var promise = $http
            .post('/candidates/get' + '/' + limit + '/' + page, searchValue)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        fetchCandidates: function(limit, page) {
          var promise = $http
            .get('/candidates/' + limit + '/' + page)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        fetchCandidate: function(id) {
          var promise = $http.get('/candidates/' + id).then(function(response) {
            return response;
          });
          return promise;
        },
        getQualification: function() {
          var promise = $http.get('/qualifications').then(function(response) {
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
        editCandidate: function(id, candidateObj) {
          var promise = $http
            .put('/candidates/edit/' + id, candidateObj)
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
