(function() {
  'use strict';
  var app = angular.module('candidates');
  app.controller('competitionsCtrl', [
    '$scope',
    '$modal',
    '$timeout',
    'toastr',
    'competitionService',
    function($scope, $modal, $timeout, toastr, competitionService) {
      $scope.pageSize = 10;
      $scope.currentPage = 1;
      $scope.total = 0;
      $scope.required = true;
      $scope.unrequited = false;
      $scope.laddaStatus = false;
      $scope.competitions = [];
      $scope.newCompetitionForm = {};
      $scope.editCompetitionForm = {};
      $scope.elections = [];

      $scope.refreshCompetitions = function() {
        competitionService
          .fetchCompetitions($scope.pageSize, $scope.currentPage)
          .then(
            function(response) {
              if (response.status == 200) {
                $scope.competitions = response.data.result;
                $scope.total = response.data.count;
              } else {
                toastr.error(
                  'يوجد خطأ في عرض انماط التنافس, الرجاء المحاولة لاحقا'
                );
              }
            },
            function(response) {
              toastr.error(
                'يوجد خطأ في عرض انماط التنافس, الرجاء الاتصال بمشرف المنظومة'
              );
              console.log('Something went wrong ' + response.data);
            }
          );
      };

      $scope.refreshCompetitions();

      $scope.getAllElections = function() {
        competitionService.fetchAllElections().then(
          function(response) {
            if (response.status == 200) {
              $scope.elections = response.data;
            } else {
              toastr.error('يوجد خطأ في عرض الانتخابات, الرجاء المحاولة لاحقا');
            }
          },
          function(response) {
            toastr.error(
              'يوجد خطأ في عرض الانتخابات, الرجاء الاتصال بمشرف المنظومة'
            );
            console.log('Something went wrong ' + response.data);
          }
        );
      };

      $scope.getAllElections();

      $scope.onSelectElection = function(selectedElection) {
        if(selectedElection == null){
          selectedElection = -1;
        }
        competitionService.search(selectedElection,$scope.pageSize, $scope.currentPage)
          .then(
            function(response) {
              if (response.status == 200) {
                $scope.competitions = response.data.result;
                $scope.total = response.data.count;
              } else {
                toastr.error(
                  'يوجد خطأ في عرض انماط التنافس, الرجاء المحاولة لاحقا'
                );
              }
            },
            function(response) {
              toastr.error(
                'يوجد خطأ في عرض انماط التنافس, الرجاء الاتصال بمشرف المنظومة'
              );
              console.log('Something went wrong ' + response.data);
            }
          );

      };

      $scope.showNewCompetitionModal = function() {
        $scope.modalTitle = 'إضافة نمط تنافسي جديد';
        $scope.newCompetitionModal = $modal({
          scope: $scope,
          templateUrl: 'pages/competition/newCompetition.html',
          show: true
        });
      };

      $scope.newCompetition = function() {
        $scope.laddaStatus = true;
        competitionService.newCompetition($scope.newCompetitionForm).then(
          function(response) {
            if (!response.data.err && response.status == 200) {
              $timeout(function() {
                $scope.newCompetitionForm = {};
                $scope.laddaStatus = false;
                $scope.newCompetitionModal.hide();
                toastr.success('تم الإضافة بنجاح');
                $scope.refreshCompetitions();
              }, 1000);
            } else if (response.data.err == 3) {
              $scope.newCompetitionModal.hide();
              $scope.laddaStatus = false;
              toastr.error('خطأ الرجاء ادخال إنتخبات ');
            } else {
              $scope.newCompetitionModal.hide();
              $scope.laddaStatus = false;
              toastr.error('خطأ في عملية الادخال, الرجاء اعادة المحاولة');
            }
          },
          function(response) {
            $scope.newCompetitionModal.hide();
            $scope.laddaStatus = false;
            toastr.error(
              'يوجد خطأ في إضافة نمط تنافسي جديد, الرجاء الاتصال بمشرف المنظومة'
            );
            console.log('Something went wrong ' + response.data);
          }
        );
      };

      $scope.showEditCompetitionModal = function(id, name) {
        $scope.id = id;
        $scope.editCompetitionForm.name = name;
        $scope.modalTitle = 'تعديل نوع من انماط التنافس';
        $scope.editCompetitionModal = $modal({
          scope: $scope,
          templateUrl: 'pages/competition/editCompetition.html',
          show: true
        });
      };

      $scope.editCompetition = function(id) {
        $scope.laddaStatus = true;
        competitionService.editCompetition(id, $scope.editCompetitionForm).then(
          function(response) {
            if (response.status == 200) {
              $timeout(function() {
                $scope.editCompetitionForm = {};
                $scope.editCompetitionModal.hide();
                $scope.laddaStatus = false;
                toastr.info('تم التعديل بنجاح');
                $scope.refreshCompetitions();
              }, 1000);
            } else {
              $scope.editCompetitionModal.hide();
              $scope.laddaStatus = false;
              toastr.error('خطأ في عملية التعديل, الرجاء اعادة المحاولة');
            }
          },
          function(response) {
            $scope.editCompetitionModal.hide();
            $scope.laddaStatus = false;
            toastr.error('يوجد خطأ في التعديل, الرجاء الاتصال بمشرف المنظومة');
            console.log('Something went wrong ' + response.data);
          }
        );
      };

      $scope.showDeleteModal = function(id, name) {
        $scope.id = id;
        $scope.modalTitle = 'رسالة تأكيد على الحذف';
        $scope.modalMessage = 'هل تريد فعلا حذف هذا النمط التنافسي';
        $scope.modalName = name;
        $scope.deleteModal = $modal({
          scope: $scope,
          templateUrl: 'pages/deleteModal.html',
          show: true
        });
      };

      $scope.confirmDeleteModal = function(id) {
        competitionService.deleteCompetition(id).then(
          function(response) {
            if (response.data.result == 1 && response.status == 200) {
              $scope.deleteModal.hide();
              $scope.init();
              toastr.success('تم الحذف بنجاح');
            } else if (response.data.result == 2 && response.status == 200) {
              $scope.deleteModal.hide();
              toastr.info(
                'لا يمكن حذف هذا النوع من انماط التنافس لاعتماده علي كيانات اخري'
              );
            } else if (response.data.result == 3 && response.status == 200) {
              $scope.deleteModal.hide();
              toastr.error('خطأ في عملية الحذف, الرجاء اعادة المحاولة');
            }
          },
          function(response) {
            $scope.deleteModal.hide();
            toastr.error('يوجد خطأ في الحذف, الرجاء الاتصال بمشرف المنظومة');
            console.log('Something went wrong ' + response.data);
          }
        );
      };
    }
  ]);
})();
