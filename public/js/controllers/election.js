(function() {
	'use strict';
	var app = angular.module('candidates');
	app.controller('electionsCtrl', [
		'$scope',
		'$modal',
		function($scope, $modal) {
			$scope.required = true;
			$scope.unrequited = false;
			$scope.elections = [];
			$scope.newElectionForm = {};
			$scope.editElectionForm = {};
			$scope.showNewElectionModal = function() {
				$scope.modalTitle = 'إضافة نوع انتخابات جديدة';
				$scope.newElectionModal = $modal({
					scope: $scope,
					templateUrl: 'pages/election/newElection.html',
					show: true
				});
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
		}
	]);
})();
