(function() {
  'use strict';
  var app = angular.module('candidates');
  app.controller('candidatesCtrl', ['$scope', function($scope) {}]);

  app.controller('newCandidateCtrl', [
    '$scope',
    '$modal',
    '$timeout',
    'toastr',
    'candidateService',
    function($scope, $modal, $timeout, toastr, candidateService) {
      $scope.attachments = [];
      $scope.competitions = [];
      $scope.genderTypes = [{ id: 1, name: 'ذكر' }, { id: 2, name: 'انتى' }];
      $scope.getAttachment = function() {
        candidateService
          .getAttachment()
          .then(
            function(response) {
              if (response.status == 200) {
                $scope.attachments = response.data;
              } else {
                toastr.error(
                  'يوجد خطأ في '
                );
              }
            },
            function(response) {
              toastr.error(
                'يوجد خطأ في '
              );
              console.log('Something went wrong ' + response.data);
            }
          );
      };
    $scope.getAttachment();

    $scope.getCompetition = function() {
        candidateService
          .getCompetition()
          .then(
            function(response) {
              if (response.status == 200) {
                $scope.competitions = response.data;
              } else {
                toastr.error(
                  'يوجد خطأ في '
                );
              }
            },
            function(response) {
              toastr.error(
                'يوجد خطأ في '
              );
              console.log('Something went wrong ' + response.data);
            }
          );
      };

    $scope.getCompetition();
    }
    
  ]);

  app.controller('editCandidateCtrl', ['$scope', function($scope) {}]);

})();
