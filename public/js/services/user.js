(function() {
  'use strict';
  angular.module('candidates').service('userService', [
    '$http',
    function($http) {
      var self = {
        fetchUsers: function(limit, page) {
          var promise = $http
            .get('/users/' + limit + '/' + page)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        search: function(userName, limit, page) {
          var promise = $http
            .get('/users/search/' + userName + '/' + limit + '/' + page)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        getOffice : function() {
          var promise = $http
            .get('/users/offices')
            .then(function(response) {
              return response;
            });
          return promise;
        },
        newUser: function(newUser) {
          var promise = $http.post('/users/', newUser).then(function(response) {
            return response;
          });
          return promise;
        },
        editUser: function(id, editUser) {
          var promise = $http
            .put('/users/' + id, editUser)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        deleteUser: function(id) {
          var promise = $http.delete('/users/' + id).then(function(response) {
            return response;
          });
          return promise;
        },
        fetchAllUsers: function() {
          var promise = $http.get('/users/all').then(function(response) {
            return response;
          });
          return promise;
        }
      };
      return self;
    }
  ]);
})();
