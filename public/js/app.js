(function() {
  'use strict';
  var app = angular.module('candidates', [
    'ui.router',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ngSanitize',
    'ngAnimate',
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
    '$datepickerProvider',
    '$asideProvider',
    'laddaProvider',
    'toastrConfig',
    function(
      $stateProvider,
      $urlRouterProvider,
      $modalProvider,
      $datepickerProvider,
      $asideProvider,
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
      angular.extend($datepickerProvider.defaults, {
        dateFormat: 'yyyy-MM-dd',
        startWeek: -1,
        dateType: 'string',
        iconLeft: 'glyphicon glyphicon-chevron-right',
        iconRight: 'glyphicon glyphicon-chevron-left',
        placement: 'bottom',
        animation: 'animated fadeIn'
      });
      angular.extend($asideProvider.defaults, {
        container: 'body',
        html: true
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
          },
          onEnter: [
            '$rootScope',
            '$state',
            'toastr',
            'authService',
            function($rootScope, $state, toastr, authService) {
              $rootScope.authGuard = {};
              authService.authGuard().then(
                function(response) {
                  if (
                    response.status == 200 &&
                    (response.data.level === 1 ||
                      response.data.level === 2 ||
                      response.data.level === 3)
                  ) {
                    $rootScope.authGuard = response.data;
                    return true;
                  } else if (!response.data.level === 0) {
                    window.location.replace('/logout');
                    return false;
                  }
                },
                function(response) {
                  console.log(response.data);
                }
              );
            }
          ]
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
          },
          onEnter: [
            '$rootScope',
            '$state',
            'toastr',
            'authService',
            function($rootScope, $state, toastr, authService) {
              $rootScope.authGuard = {};
              authService.authGuard().then(
                function(response) {
                  if (response.data.level === 3) {
                    $rootScope.authGuard = response.data;
                    return true;
                  } else if (response.data.level === 0) {
                    window.location.replace('/logout');
                    return false;
                  } else {
                    toastr.error('ليس لديك إذن بالدخول إلى هذه الصفحة');
                    $state.go('candidates');
                    return false;
                  }
                },
                function(response) {
                  console.log(response.data);
                }
              );
            }
          ]
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
          },
          onEnter: [
            '$rootScope',
            '$state',
            'toastr',
            'authService',
            function($rootScope, $state, toastr, authService) {
              $rootScope.authGuard = {};
              authService.authGuard().then(
                function(response) {
                  if (response.data.level === 2) {
                    $rootScope.authGuard = response.data;
                    return true;
                  } else if (response.data.level === 0) {
                    window.location.replace('/logout');
                    return false;
                  } else {
                    toastr.error('ليس لديك إذن بالدخول إلى هذه الصفحة');
                    $state.go('candidates');
                    return false;
                  }
                },
                function(response) {
                  console.log(response.data);
                }
              );
            }
          ]
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
          },
          onEnter: [
            '$rootScope',
            '$state',
            'toastr',
            'authService',
            function($rootScope, $state, toastr, authService) {
              $rootScope.authGuard = {};
              authService.authGuard().then(
                function(response) {
                  if (response.data.level === 1) {
                    $rootScope.authGuard = response.data;
                    return true;
                  } else if (response.data.level === 0) {
                    window.location.replace('/logout');
                    return false;
                  } else {
                    toastr.error('ليس لديك إذن بالدخول إلى هذه الصفحة');
                    $state.go('candidates');
                    return false;
                  }
                },
                function(response) {
                  console.log(response.data);
                }
              );
            }
          ]
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
          },
          onEnter: [
            '$rootScope',
            '$state',
            'toastr',
            'authService',
            function($rootScope, $state, toastr, authService) {
              $rootScope.authGuard = {};
              authService.authGuard().then(
                function(response) {
                  if (response.data.level === 1 || response.data.level === 2) {
                    $rootScope.authGuard = response.data;
                    return true;
                  } else if (response.data.level === 0) {
                    window.location.replace('/logout');
                    return false;
                  } else {
                    toastr.error('ليس لديك إذن بالدخول إلى هذه الصفحة');
                    $state.go('candidates');
                    return false;
                  }
                },
                function(response) {
                  console.log(response.data);
                }
              );
            }
          ]
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
          },
          onEnter: [
            '$rootScope',
            '$state',
            'toastr',
            'authService',
            function($rootScope, $state, toastr, authService) {
              $rootScope.authGuard = {};
              authService.authGuard().then(
                function(response) {
                  if (response.data.level === 1 || response.data.level === 2) {
                    $rootScope.authGuard = response.data;
                    return true;
                  } else if (response.data.level === 0) {
                    window.location.replace('/logout');
                    return false;
                  } else {
                    toastr.error('ليس لديك إذن بالدخول إلى هذه الصفحة');
                    $state.go('candidates');
                    return false;
                  }
                },
                function(response) {
                  console.log(response.data);
                }
              );
            }
          ]
        })
        .state('users', {
          url: '/users',
          templateUrl: 'pages/user/userList',
          data: { pageTitle: 'المستخدمين' },
          controller: 'usersCtrl',
          resolve: {
            deps: [
              '$ocLazyLoad',
              function($ocLazyLoad) {
                return $ocLazyLoad.load({
                  insertBefore: '#ngLoadControllersBefore',
                  files: [
                    '/js/services/helpers.js',
                    '/js/services/user.js',
                    '/js/controllers/user.js'
                  ]
                });
              }
            ]
          },
          onEnter: [
            '$rootScope',
            '$state',
            'toastr',
            'authService',
            function($rootScope, $state, toastr, authService) {
              $rootScope.authGuard = {};
              authService.authGuard().then(
                function(response) {
                  if (response.data.level === 1) {
                    $rootScope.authGuard = response.data;
                    return true;
                  } else if (response.data.level === 0) {
                    window.location.replace('/logout');
                    return false;
                  } else {
                    toastr.error('ليس لديك إذن بالدخول إلى هذه الصفحة');
                    $state.go('candidates');
                    return false;
                  }
                },
                function(response) {
                  console.log(response.data);
                }
              );
            }
          ]
        });
    }
  ]);
})();
