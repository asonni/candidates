(function() {
  'use strict';
  angular.module('candidates').service('competitionService', [
    '$http',
    function($http) {
      var self = {
        fetchCompetitions: function(limit, page) {
          var promise = $http
            .get('/competitions/' + limit + '/' + page)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        search: function(election, limit, page) {
          var promise = $http
            .get(
              '/competitions/search/' +election+
                '/' +
                limit +
                '/' +
                page
            )
            .then(function(response) {
              return response;
            });
          return promise;
        },
        newCompetition: function(newCompetition) {
          var promise = $http
            .post('/competitions', newCompetition)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        editCompetition: function(id, editCompetition) {
          var promise = $http
            .put('/competitions/' + id, editCompetition)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        deleteCompetition: function(id) {
          var promise = $http
            .delete('/competitions/' + id)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        fetchAllCompetitions: function() {
          var promise = $http.get('/competitions/all').then(function(response) {
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
