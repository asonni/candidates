(function() {
  'use strict';
  var app = angular.module('candidates');
  app.controller('candidatesCtrl', ['$scope', function($scope) {}]);

  app.controller('newCandidateCtrl', [
    '$scope',
    '$modal',
    '$state',
    '$timeout',
    'toastr',
    'candidateService',
    function($scope, $modal, $state, $timeout, toastr, candidateService) {
      $scope.required = true;
      $scope.unrequited = false;
      $scope.attachments = [];
      $scope.competitions = [];
      $scope.genderTypes = [{ id: 1, name: 'ذكر' }, { id: 2, name: 'انتى' }];
      $scope.newCandidateForm = {};
      $scope.getAttachment = function() {
        candidateService.getAttachment().then(
          function(response) {
            if (response.status == 200) {
              $scope.attachments = response.data;
              console.log($scope.attachments);
            } else {
              toastr.error('يوجد خطأ في ');
            }
          },
          function(response) {
            toastr.error('يوجد خطأ في ');
            console.log('Something went wrong ' + response.data);
          }
        );
      };
      $scope.getAttachment();
      $scope.getCompetition = function() {
        candidateService.getCompetition().then(
          function(response) {
            if (response.status == 200) {
              $scope.competitions = response.data;
            } else {
              toastr.error('يوجد خطأ في ');
            }
          },
          function(response) {
            toastr.error('يوجد خطأ في ');
            console.log('Something went wrong ' + response.data);
          }
        );
      };
      $scope.getCompetition();
      $scope.newCandidate = function() {
        $scope.laddaStatus = true;
        attachmentService.newCandidate($scope.newCandidateForm).then(
          function(response) {
            if (!response.data.err && response.status == 200) {
              $timeout(function() {
                $scope.newCandidateForm = {};
                $scope.laddaStatus = false;
                toastr.success('تم الإضافة بنجاح');
                $state.go('candidates');
              }, 1000);
            } else if (response.data.err == 3) {
              $scope.laddaStatus = false;
              toastr.error('الرجاء اضافة مترشح جديد');
            } else {
              $scope.laddaStatus = false;
              toastr.error('خطأ في عملية الادخال, الرجاء اعادة المحاولة');
            }
          },
          function(response) {
            $scope.laddaStatus = false;
            toastr.error(
              'يوجد خطأ في ادخال مترشح جديد, الرجاء الاتصال بمشرف المنضومة'
            );
            console.log('Something went wrong ' + response.data);
          }
        );
      };
    }
  ]);

  app.controller('editCandidateCtrl', ['$scope', function($scope) {}]);
})();
