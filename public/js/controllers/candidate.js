(function() {
	'use strict';
	var app = angular.module('candidates');
	app.controller('candidatesCtrl', ['$scope', function($scope) {}]);

	app.controller('newCandidateCtrl', [
		'$scope',
		function($scope) {
			$scope.genderTypes = [{ id: 1, name: 'ذكر' }, { id: 2, name: 'انتى' }];
		}
	]);

	app.controller('editCandidateCtrl', ['$scope', function($scope) {}]);
})();
