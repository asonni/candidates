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

  app.run([
    '$rootScope',
    '$state',
    '$window',
    'defaultErrorMessageResolver',
    function($rootScope, $state, $window, defaultErrorMessageResolver) {
      // $window.onbeforeunload =  function() {
      //    return ('bye bye');
      //  };
      $rootScope.$state = $state; // state to be accessed from view
      defaultErrorMessageResolver.setI18nFileRootPath('/lang');
      defaultErrorMessageResolver.setCulture('ar-ly');
      defaultErrorMessageResolver
        .getErrorMessages()
        .then(function(errorMessages) {
          errorMessages.emailType = 'الرجاء إدخال بريد إلكتروني صالح';
          errorMessages.phone = 'الرجاء إدخال رقم هاتف صالح';
          errorMessages.date = 'الرجاء ادخال تاريخ صالح';
          errorMessages.equalsTo = 'كلمتا المرور غير متطابقتان';
          errorMessages.ngRemoteValidate = ' ';
        });
    }
  ]);

  app.controller('headerCtrl', ['$scope', function($scope) {}]);

  app.controller('footerCtrl', ['$scope', function($scope) {}]);

  app.config([
    '$stateProvider',
    '$urlRouterProvider',
    '$modalProvider',
    'laddaProvider',
    'toastrConfig',
    function(
      $stateProvider,
      $urlRouterProvider,
      $modalProvider,
      laddaProvider,
      toastrConfig
    ) {
      laddaProvider.setOption({
        /* optional */
        style: 'zoom-in'
      });
      angular.extend(toastrConfig, {
        positionClass: 'toast-top-left',
        progressBar: true,
        tapToDismiss: true,
        preventOpenDuplicates: true
      });
      angular.extend($modalProvider.defaults, {
        animation: 'animated zoomIn'
      });
      // Redirect any unmatched url
      $urlRouterProvider.otherwise('/candidates');
      //  New Invoice Page
      $stateProvider
        .state('candidates', {
          url: '/candidates',
          templateUrl: 'pages/candidate/candidateList',
          data: { pageTitle: 'المرشحين' },
          controller: 'candidatesCtrl',
          resolve: {
            deps: [
              '$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  insertBefore: '#ngLoadControllersBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                  files: [
                    '/js/services/helpers.js',
                    '/js/services/candidate.js',
                    '/js/controllers/candidate.js'
                  ]
                });
              }
            ]
          }
        })
        .state('newCandidate', {
          url: '/candidates/new',
          templateUrl: 'pages/candidate/newCandidate',
          data: { pageTitle: 'مترشح جديد' },
          controller: 'newCandidateCtrl',
          resolve: {
            deps: [
              '$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  insertBefore: '#ngLoadControllersBefore', // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
                  files: [
                    '/js/services/helpers.js',
                    '/js/services/candidate.js',
                    '/js/controllers/candidate.js'
                  ]
                });
              }
            ]
          }
        })
        .state('editCandidate', {
          url: '/candidates/edit/:id',
          templateUrl: 'pages/candidate/editCandidate',
          data: { pageTitle: 'تعديل مرشح' },
          controller: 'editCandidateCtrl',
          resolve: {
            deps: [
              '$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  insertBefore: '#ngLoadControllersBefore',
                  files: [
                    '/js/services/helpers.js',
                    '/js/services/candidate.js',
                    '/js/controllers/candidate.js'
                  ]
                });
              }
            ]
          }
        })
        .state('elections', {
          url: '/elections',
          templateUrl: 'pages/election/electionList',
          data: { pageTitle: 'الانتخابات' },
          controller: 'electionsCtrl',
          resolve: {
            deps: [
              '$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  insertBefore: '#ngLoadControllersBefore',
                  files: [
                    '/js/services/helpers.js',
                    '/js/services/election.js',
                    '/js/controllers/election.js'
                  ]
                });
              }
            ]
          }
        })
        .state('competitions', {
          url: '/competitions',
          templateUrl: 'pages/competition/competitionList',
          data: { pageTitle: 'انماط التنافس' },
          controller: 'competitionsCtrl',
          resolve: {
            deps: [
              '$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  insertBefore: '#ngLoadControllersBefore',
                  files: [
                    '/js/services/helpers.js',
                    '/js/services/competition.js',
                    '/js/controllers/competition.js'
                  ]
                });
              }
            ]
          }
        })
        .state('attachments', {
          url: '/attachments',
          templateUrl: 'pages/attachment/attachmentList',
          data: { pageTitle: 'المرفقات' },
          controller: 'attachmentsCtrl',
          resolve: {
            deps: [
              '$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  insertBefore: '#ngLoadControllersBefore',
                  files: [
                    '/js/services/helpers.js',
                    '/js/services/attachment.js',
                    '/js/controllers/attachment.js'
                  ]
                });
              }
            ]
          }
        });
    }
  ]);
})();
