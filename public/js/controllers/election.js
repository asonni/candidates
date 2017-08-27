(function() {
	'use strict';
	var app = angular.module('candidates');
	app.controller('electionsCtrl', [
		'$scope',
		'$modal',
		'toastr',
		'electionService',
		function($scope, $modal, toastr, electionService) {
			$scope.pageSize = 10;
			$scope.currentPage = 1;
			$scope.total = 0;
			$scope.required = true;
			$scope.unrequited = false;
			$scope.laddaStatus = false;
			$scope.elections = [];
			$scope.newElectionForm = {};
			$scope.editElectionForm = {};

			$scope.refreshElections = function() {
				electionService
					.fetchElections($scope.pageSize, $scope.currentPage)
					.then(
						function(response) {
							if (response.status == 200) {
								$scope.elections = response.data.result;
								$scope.total = response.data.count;
							} else {
								toastr.error(
									'يوجد خطأ في عرض انواع الانتخابات, الرجاء المحاولة لاحقا'
								);
							}
						},
						function(response) {
							toastr.error(
								'يوجد خطأ في عرض انواع الانتخابات, الرجاء الاتصال بمشرف المنظومة'
							);
							console.log('Something went wrong ' + response.data);
						}
					);
			};

			$scope.refreshElections();

			$scope.showNewElectionModal = function() {
				$scope.modalTitle = 'إضافة نوع انتخابات جديدة';
				$scope.newElectionModal = $modal({
					scope: $scope,
					templateUrl: 'pages/election/newElection.html',
					show: true
				});
			};

			$scope.newElection = function() {
				$scope.laddaStatus = true;
				electionService.newElection($scope.newElectionForm).then(
					function(response) {
						if (response.data && response.status == 200) {
							$timeout(function() {
								$scope.newElectionForm = {};
								$scope.laddaStatus = false;
								toastr.success('تم الإضافة بنجاح');
								$scope.refreshElections();
							}, 1000);
						} else {
							$scope.laddaStatus = false;
							toastr.error('خطأ في عملية الادخال, الرجاء اعادة المحاولة');
						}
					},
					function(response) {
						$scope.laddaStatus = false;
						toastr.error(
							'يوجد خطأ في اضافة مصرف جديد, الرجاء الاتصال بمشرف المنظومة'
						);
						console.log('Something went wrong ' + response.data);
					}
				);
			};

			$scope.showEditElectionModal = function(id, name) {
				$scope.id = id;
				$scope.editElectionForm.name = name;
				$scope.modalTitle = 'تعديل نوع من الانتخابات';
				$scope.editElectionModal = $modal({
					scope: $scope,
					templateUrl: 'pages/election/editElection.html',
					show: true
				});
			};

			$scope.editElection = function(id) {
				$scope.laddaStatus = true;
				electionService.editElection(id, $scope.editElectionForm).then(
					function(response) {
						if (response.status == 200) {
							$timeout(function() {
								$scope.editElectionForm = {};
								$scope.laddaStatus = false;
								toastr.info('تم التعديل بنجاح');
								$scope.refreshElections();
							}, 1000);
						} else {
							$scope.laddaStatus = false;
							toastr.error('خطأ في عملية التعديل, الرجاء اعادة المحاولة');
						}
					},
					function(response) {
						$scope.laddaStatus = false;
						toastr.error('يوجد خطأ في التعديل, الرجاء الاتصال بمشرف المنظومة');
						console.log('Something went wrong ' + response.data);
					}
				);
			};

			$scope.showDeleteModal = function(id, name) {
				$scope.id = id;
				$scope.modalTitle = 'رسالة تأكيد على الحذف';
				$scope.modalMessage = 'هل تريد فعلا حذف هذا النوع من الانخابات';
				$scope.modalName = name;
				$scope.deleteModal = $modal({
					scope: $scope,
					templateUrl: 'pages/deleteModal.html',
					show: true
				});
			};

			$scope.confirmDeleteModal = function(id) {
				electionService.deleteElection(id).then(
					function(response) {
						if (response.data.result == 1 && response.status == 200) {
							$scope.deleteModal.hide();
							$scope.init();
							toastr.success('تم الحذف بنجاح');
						} else if (response.data.result == 2 && response.status == 200) {
							$scope.deleteModal.hide();
							toastr.info(
								'لا يمكن حذف هذا النوع من الانتخابات لاعتماده علي كيانات اخري'
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
