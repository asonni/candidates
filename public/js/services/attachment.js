(function() {
  'use strict';
  angular.module('candidates').service('attachmentService', [
    '$http',
    function($http) {
      var self = {
        fetchAttachments: function(limit, page) {
          var promise = $http
            .get('/attachments/' + limit + '/' + page)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        search: function(attachmentName, limit, page) {
          var promise = $http
            .get(
              '/attachments/search/' + attachmentName + '/' + limit + '/' + page
            )
            .then(function(response) {
              return response;
            });
          return promise;
        },
        newAttachment: function(newAttachment) {
          var promise = $http
            .post('/attachments', newAttachment)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        editAttachment: function(id, editAttachment) {
          var promise = $http
            .put('/attachments/' + id, editAttachment)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        deleteAttachment: function(id) {
          var promise = $http
            .delete('/attachments/' + id)
            .then(function(response) {
              return response;
            });
          return promise;
        },
        fetchAllAttachments: function() {
          var promise = $http.get('/attachments/all').then(function(response) {
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
