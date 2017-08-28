(function() {
  'use strict';
  var app = angular.module('candidates');
  app.controller('attachmentsCtrl', [
    '$scope',
    '$modal',
    '$timeout',
    'toastr',
    'attachmentService',
    function($scope, $modal, $timeout, toastr, attachmentService) {
      $scope.pageSize = 10;
      $scope.currentPage = 1;
      $scope.total = 0;
      $scope.required = true;
      $scope.unrequited = false;
      $scope.laddaStatus = false;
      $scope.attachments = [];
      $scope.newAttachmentForm = {};
      $scope.editAttachmentForm = {};

      $scope.refreshAttachments = function() {
        attachmentService
          .fetchAttachments($scope.pageSize, $scope.currentPage)
          .then(
            function(response) {
              if (response.status == 200) {
                $scope.attachments = response.data.result;
                $scope.total = response.data.count;
              } else {
                toastr.error('يوجد خطأ في عرض المرفقات, الرجاء المحاولة لاحقا');
              }
            },
            function(response) {
              toastr.error(
                'يوجد خطأ في عرض المرفقات, الرجاء الاتصال بمشرف المنظومة'
              );
              console.log('Something went wrong ' + response.data);
            }
          );
      };

      $scope.refreshAttachments();

      $scope.showNewAttachmentModal = function() {
        $scope.modalTitle = 'إضافة مرفق جديد';
        $scope.newAttachmentModal = $modal({
          scope: $scope,
          templateUrl: 'pages/attachment/newAttachment.html',
          show: true
        });
      };

      $scope.newAttachment = function() {
        $scope.laddaStatus = true;
        attachmentService.newAttachment($scope.newAttachmentForm).then(
          function(response) {
            if (response.data && response.status == 200) {
              $timeout(function() {
                $scope.newAttachmentForm = {};
                $scope.laddaStatus = false;
                $scope.newAttachmentModal.hide();
                toastr.success('تم الإضافة بنجاح');
                $scope.refreshAttachments();
              }, 1000);
            } else {
              $scope.newAttachmentModal.hide();
              $scope.laddaStatus = false;
              toastr.error('خطأ في عملية الادخال, الرجاء اعادة المحاولة');
            }
          },
          function(response) {
            $scope.newAttachmentModal.hide();
            $scope.laddaStatus = false;
            toastr.error(
              'يوجد خطأ في إضافة مرفق جديد, الرجاء الاتصال بمشرف المنظومة'
            );
            console.log('Something went wrong ' + response.data);
          }
        );
      };

      $scope.showEditAttachmentModal = function(id, name) {
        $scope.id = id;
        $scope.editAttachmentForm.name = name;
        $scope.modalTitle = 'تعديل نوع من المرفقات';
        $scope.editAttachmentModal = $modal({
          scope: $scope,
          templateUrl: 'pages/attachment/editAttachment.html',
          show: true
        });
      };

      $scope.editAttachment = function(id) {
        $scope.laddaStatus = true;
        attachmentService.editAttachment(id, $scope.editAttachmentForm).then(
          function(response) {
            if (response.status == 200) {
              $timeout(function() {
                $scope.editAttachmentForm = {};
                $scope.editAttachmentModal.hide();
                $scope.laddaStatus = false;
                toastr.info('تم التعديل بنجاح');
                $scope.refreshAttachments();
              }, 1000);
            } else {
              $scope.editAttachmentModal.hide();
              $scope.laddaStatus = false;
              toastr.error('خطأ في عملية التعديل, الرجاء اعادة المحاولة');
            }
          },
          function(response) {
            $scope.editAttachmentModal.hide();
            $scope.laddaStatus = false;
            toastr.error('يوجد خطأ في التعديل, الرجاء الاتصال بمشرف المنظومة');
            console.log('Something went wrong ' + response.data);
          }
        );
      };

      $scope.showDeleteModal = function(id, name) {
        $scope.id = id;
        $scope.modalTitle = 'رسالة تأكيد على الحذف';
        $scope.modalMessage = 'هل تريد فعلا حدف هذا المرفق';
        $scope.modalName = name;
        $scope.deleteModal = $modal({
          scope: $scope,
          templateUrl: 'pages/deleteModal.html',
          show: true
        });
      };

      $scope.confirmDeleteModal = function(id) {
        attachmentService.deleteAttachment(id).then(
          function(response) {
            if (response.data.result == 1 && response.status == 200) {
              $scope.deleteModal.hide();
              $scope.init();
              toastr.success('تم الحذف بنجاح');
            } else if (response.data.result == 2 && response.status == 200) {
              $scope.deleteModal.hide();
              toastr.info(
                'لا يمكن حذف هذا النوع من المرفقات لاعتماده علي كيانات اخري'
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
