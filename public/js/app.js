(function() {
  'use strict';
  var app = angular.module('candidates', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngSanitize',
    'mgcrea.ngStrap',
    'jcs-autoValidate',
    'toastr',
    'angular-ladda'
  ]);

  app.run(['$rootScope', '$state', '$window', 'defaultErrorMessageResolver', function($rootScope, $state, $window, defaultErrorMessageResolver) {
   // $window.onbeforeunload =  function() {
   //    return ('bye bye');
   //  };
    $rootScope.$state = $state; // state to be accessed from view
    defaultErrorMessageResolver.setI18nFileRootPath('/lang');
    defaultErrorMessageResolver.setCulture('ar-ly');
    defaultErrorMessageResolver.getErrorMessages().then(function (errorMessages) {
      errorMessages.emailType = "الرجاء إدخال بريد إلكتروني صالح";
      errorMessages.phone = "الرجاء إدخال رقم هاتف صالح";
      errorMessages.date = "الرجاء ادخال تاريخ صالح";
      errorMessages.equalsTo = "كلمتا المرور غير متطابقتان";
      errorMessages.ngRemoteValidate = " ";
    });
  }]);

  app.controller('headerCtrl', ['$scope', function($scope) {
  }]);

  app.controller('footerCtrl', ['$scope', function($scope) {
  }]);

  app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise('/candidates');  
    //  New Invoice Page
    $stateProvider.state('candidates', {
      url: '/candidates',
      templateUrl: 'pages/candidate/candidatesList',            
      data: {pageTitle: 'فاتورة بيع جديدة'},
      controller: 'candidatesCtrl',
      resolve: {
        deps: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load({
            insertBefore: '#ngLoadControllersBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
            files: [
              '/js/services/helpers.js',
              '/js/services/candidates.js',
              '/js/controllers/candidates.js'
            ]
          });
        }]
      }
    })
  }]);
}());
