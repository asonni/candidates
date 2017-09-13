(function() {
  'use strict';
  angular.module('candidates').service('electionService', [
    '$http',
    function($http) {
      var self = {
        fetchElections: function(limit, page) {
          var promise = $http
            .get('/elections/' + limit + '/' + page)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        search: function(electionName, limit, page) {
          var promise = $http
            .get('/elections/search/' + electionName + '/' + limit + '/' + page)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        newElection: function(newElection) {
          var promise = $http
            .post('/elections/', newElection)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        editElection: function(id, editElection) {
          var promise = $http
            .put('/elections/' + id, editElection)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        deleteElection: function(id) {
          var promise = $http
            .delete('/elections/' + id)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        fetchAllElections: function() {
          var promise = $http.get('/elections/all').then(function(response) {
            return response;
          });
          return promise;
        }
      };
      return self;
    }
  ]);
})();
