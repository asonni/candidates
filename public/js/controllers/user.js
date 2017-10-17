(function() {
  'use strict';
  var app = angular.module('candidates');
  app.controller('usersCtrl', [
    '$scope',
    '$modal',
    '$timeout',
    'toastr',
    'userService',
    function($scope, $modal, $timeout, toastr, userService) {
      $scope.pageSize = 10;
      $scope.currentPage = 1;
      $scope.total = 0;
      $scope.required = true;
      $scope.unrequited = false;
      $scope.laddaStatus = false;
      $scope.users = [];
      $scope.newUserForm = {};
      $scope.editUserForm = {};
      $scope.levels = [
        { id: 1, name: 'root' },
        { id: 2, name: 'admin' },
        { id: 3, name: 'normal user' }
      ];

      $scope.refreshUsers = function() {
        userService.fetchUsers($scope.pageSize, $scope.currentPage).then(
          function(response) {
            if (response.status == 200) {
              $scope.users = response.data.result;
              $scope.total = response.data.count;
            } else {
              toastr.error('يوجد خطأ في عرض المستخدمين, الرجاء المحاولة لاحقا');
            }
          },
          function(response) {
            toastr.error(
              'يوجد خطأ في عرض المستخدمين, الرجاء الاتصال بمشرف المنظومة'
            );
            console.log('Something went wrong ' + response.data);
          }
        );
      };

      $scope.refreshUsers();

      $scope.showNewUserModal = function() {
        $scope.modalTitle = 'إضافة مستخدم جديد';
        $scope.newUserModal = $modal({
          scope: $scope,
          templateUrl: 'pages/user/newUser',
          show: true
        });
      };

      $scope.newUser = function() {
        $scope.laddaStatus = true;
        userService.newUser($scope.newUserForm).then(
          function(response) {
            if (response.data && response.status == 200) {
              $timeout(function() {
                $scope.newUserForm = {};
                $scope.laddaStatus = false;
                $scope.newUserModal.hide();
                toastr.success('تم الإضافة بنجاح');
                $scope.refreshUsers();
              }, 1000);
            } else {
              $scope.newUserModal.hide();
              $scope.laddaStatus = false;
              toastr.error('خطأ في عملية الادخال, الرجاء اعادة المحاولة');
            }
          },
          function(response) {
            $scope.newUserModal.hide();
            $scope.laddaStatus = false;
            toastr.error(
              'يوجد خطأ في عملية ادخال مستخدم جديد, الرجاء الاتصال بمشرف المنظومة'
            );
            console.log('Something went wrong ' + response.data);
          }
        );
      };

      $scope.showEditUserModal = function(id, userObj) {
        $scope.id = id;
        $scope.editUserForm = userObj;
        $scope.modalTitle = 'تعديل مستخدم معين';
        $scope.editUserModal = $modal({
          scope: $scope,
          templateUrl: 'pages/user/editUser',
          show: true
        });
      };

      $scope.editUser = function(id) {
        $scope.laddaStatus = true;
        userService.editUser(id, $scope.editUserForm).then(
          function(response) {
            if (response.status == 200) {
              $timeout(function() {
                $scope.editUserForm = {};
                $scope.editUserModal.hide();
                $scope.laddaStatus = false;
                toastr.info('تم التعديل بنجاح');
                $scope.refreshUser();
              }, 1000);
            } else {
              $scope.editUserModal.hide();
              $scope.laddaStatus = false;
              toastr.error('خطأ في عملية التعديل, الرجاء اعادة المحاولة');
            }
          },
          function(response) {
            $scope.editUserModal.hide();
            $scope.laddaStatus = false;
            toastr.error('يوجد خطأ في التعديل, الرجاء الاتصال بمشرف المنظومة');
            console.log('Something went wrong ' + response.data);
          }
        );
      };

      $scope.showDeleteModal = function(id, name) {
        $scope.id = id;
        $scope.modalTitle = 'رسالة تأكيد على الحذف';
        $scope.modalMessage = 'هل تريد فعلا حذف هذا المستخدم';
        $scope.modalName = name;
        $scope.deleteModal = $modal({
          scope: $scope,
          templateUrl: 'pages/deleteModal',
          show: true
        });
      };

      $scope.confirmDeleteModal = function(id) {
        userService.deleteUser(id).then(
          function(response) {
            if (response.data.result == 1 && response.status == 200) {
              $scope.deleteModal.hide();
              $scope.init();
              toastr.success('تم الحذف بنجاح');
            } else if (response.data.result == 2 && response.status == 200) {
              $scope.deleteModal.hide();
              toastr.info('لا يمكن حذف هذا المستخدم لاعتماده علي كيانات اخري');
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
