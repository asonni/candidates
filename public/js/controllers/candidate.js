(function() {
  'use strict';
  var app = angular.module('candidates');
  app.controller('candidatesCtrl', [
    '$scope',
    '$modal',
    '$state',
    '$timeout',
    'toastr',
    'helpers',
    'candidateService',
    function(
      $scope,
      $modal,
      $state,
      $timeout,
      toastr,
      helpers,
      candidateService
    ) {
      $scope.required = true;
      $scope.unrequited = false;
      $scope.laddaAdvancedSearchModal = false;
      $scope.pageSize = 10;
      $scope.currentPage = 1;
      $scope.total = 0;
      $scope.candidates = [];
      $scope.competitions = [];
      $scope.elections = [];
      $scope.advancedSearchObj = {};
      $scope.advancedSearchObj.selectedElection = null;
      $scope.genderTypes = [{ id: 1, name: 'ذكر' }, { id: 2, name: 'انتى' }];
      var fullDate = new Date();
      var printDate =
        fullDate.getFullYear() +
        '-' +
        ('0' + (fullDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + fullDate.getDate()).slice(-2);
      candidateService.getQualification().then(
        function(response) {
          if (response.status == 200) {
            $scope.qualifications = response.data;
          } else {
            toastr.error('يوجد خطأ في ');
          }
        },
        function(response) {
          toastr.error('يوجد خطأ في ');
          console.log('Something went wrong ' + response.data);
        }
      );
      $scope.refreshCandidates = function() {
        candidateService
          .fetchCandidates($scope.pageSize, $scope.currentPage)
          .then(
            function(response) {
              if (response.status == 200) {
                $scope.candidates = response.data.result;
                $scope.total = response.data.count;
              } else {
                toastr.error('يوجد خطأ في عرض المرشحين, الرجاء الاتصال لاحقا');
              }
            },
            function(response) {
              toastr.error(
                'يوجد خطأ في عرض المرشحين, الرجاء الاتصال بمشرف المنضومة'
              );
              console.log('Something went wrong ' + response.data);
            }
          );
      };
      $scope.refreshCandidates();

      $scope.getAttachment = function() {
        candidateService.getAttachment().then(
          function(response) {
            if (response.status == 200) {
              $scope.attachments = response.data;
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

      $scope.getAllElections = function() {
        candidateService.fetchAllElections().then(
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

      $scope.showAdvancedSearchModal = function() {
        $scope.advancedSearchModal = $modal({
          scope: $scope,
          templateUrl: 'pages/candidate/advancedSearch.html',
          show: true
        });
      };

      $scope.onAdvancedSearch = function() {
        $scope.laddaAdvancedSearchModal = true;
        if ($scope.advancedSearchModal) {
          $scope.advancedSearchModal.hide();
        }
        candidateService
          .getAllCandidatesBySearchValue(
            $scope.advancedSearchObj,
            $scope.pageSize,
            $scope.currentPage
          )
          .then(
            function(response) {
              $scope.candidates = response.data.result;
              $scope.total = response.data.count;
              $scope.laddaAdvancedSearchModal = false;
            },
            function(response) {
              console.log('Something went wrong');
              $scope.laddaAdvancedSearchModal = false;
            }
          );
      };

      pdfMake.fonts = {
        JFFlat: {
          normal: 'JF-Flat-regular.ttf',
          bold: 'JF-Flat-medium.ttf',
          italics: 'JF-Flat-regular.ttf',
          bolditalics: 'JF-Flat-regular.ttf'
        }
      };

      $scope.printCandidates = function() {
        console.log($scope.candidates);
        function bulidItemBody() {
          var body = [
            [
              {
                text: helpers.leftToRight('الهاتف النقال')
              },
              {
                text: helpers.leftToRight('تاريخ الميلاد')
              },
              {
                text: 'الجنس'
              },
              {
                text: helpers.leftToRight('اسم اﻷم الثلاثي')
              },
              {
                text: helpers.leftToRight('اﻷسم رباعي')
              },
              {
                text: helpers.leftToRight('رقم كتيب العائلة')
              },
              {
                text: helpers.leftToRight('الرقم الوطني')
              },
              {
                text: 'ر.ت'
              }
            ]
          ];
          for (var i = 0; i < $scope.candidates.length; i++) {
            body.push([
              {
                text: $scope.candidates[i].phone
              },
              {
                text: helpers.reduceDate($scope.candidates[i].birth_day)
              },
              {
                text: $scope.candidates[i].gender === 1 ? 'ذكر' : 'انثي'
              },
              {
                text: helpers.leftToRight($scope.candidates[i].mother_name)
              },
              {
                text: helpers.leftToRight(
                  $scope.candidates[i].f_name +
                    ' ' +
                    $scope.candidates[i].p_name +
                    ' ' +
                    $scope.candidates[i].g_name +
                    ' ' +
                    $scope.candidates[i].l_name
                )
              },
              {
                text: $scope.candidates[i].cra
              },
              {
                text: $scope.candidates[i].nid
              },
              {
                text: i + 1
              }
            ]);
          }
          return body;
        }
        var docDefinition = {
          pageSize: 'A4',
          pageOrientation: 'landscape',
          content: [
            {
              columns: [
                {
                  text: helpers.leftToRight(
                    'المفوضية الوطنية العليا لأنتخابات'
                  ),
                  style: 'headerStyle'
                }
              ]
            },
            {
              columns: [
                {
                  text: printDate + ' تاريخ',
                  style: 'printDateStyle'
                }
              ]
            },
            {
              table: {
                headerRows: 1,
                widths: [60, 55, 30, '*', '*', 75, 70, 30],
                body: bulidItemBody()
              },
              layout: {
                hLineColor: function(i) {
                  return i === 0 ||
                    i === 1 ||
                    i === $scope.candidates.length + 1
                    ? 'black'
                    : '#aaa';
                },
                fillColor: function(i, node) {
                  return i % 2 === 0 ? '#CCCCCC' : null;
                }
              }
            }
          ],
          styles: {
            headerStyle: {
              bold: true,
              fontSize: 16
            },
            printDateStyle: {
              alignment: 'right',
              margin: [0, 0, 0, 10]
            }
          },
          defaultStyle: {
            fontSize: 10,
            font: 'JFFlat',
            alignment: 'center'
          }
        };
        pdfMake.createPdf(docDefinition).open();
      };
    }
  ]);

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
      // $scope.qualifications = [
      //   { id: 1, name: 'درجة البكالوريوس' },
      //   { id: 2, name: 'درجة الماجستير' },
      //   { id: 3, name: 'درجة الدكتوراه' }
      // ];
      candidateService.getQualification().then(
        function(response) {
          if (response.status == 200) {
            $scope.qualifications = response.data;
          } else {
            toastr.error('يوجد خطأ في ');
          }
        },
        function(response) {
          toastr.error('يوجد خطأ في ');
          console.log('Something went wrong ' + response.data);
        }
      );
      $scope.getAttachment = function() {
        candidateService.getAttachment().then(
          function(response) {
            if (response.status == 200) {
              $scope.attachments = response.data;
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
        console.log($scope.newCandidateForm.attachment)
        $scope.newCandidateForm.attachment = $.map(
          $scope.newCandidateForm.attachment,
          function(value, index) {
            return [index];
          }
        );
        candidateService.newCandidate($scope.newCandidateForm).then(
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
            } else if (response.data.err == 4) {
              $scope.laddaStatus = false;
              toastr.error('خطأ الرجاء ادخال البيانات بالشكل الصحيح ');
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


  app.controller('editCandidateCtrl', [
    '$scope',
    '$timeout',
    '$state',
    '$stateParams',
    'toastr',
    'helpers',
    'candidateService',
    function(
      $scope,
      $timeout,
      $state,
      $stateParams,
      toastr,
      helpers,
      candidateService
    ) {
      $scope.required = true;
      $scope.unrequited = false;
      $scope.laddaStatus = false;
      $scope.attachments = [];
      $scope.competitions = [];
      $scope.genderTypes = [{ id: 1, name: 'ذكر' }, { id: 2, name: 'انتى' }];
      $scope.editCandidateForm = {};
      candidateService.getQualification().then(
        function(response) {
          if (response.status == 200) {
            $scope.qualifications = response.data;
          } else {
            toastr.error('يوجد خطأ في ');
          }
        },
        function(response) {
          toastr.error('يوجد خطأ في ');
          console.log('Something went wrong ' + response.data);
        }
      );
      $scope.getAttachment = function() {
        candidateService.getAttachment().then(
          function(response) {
            if (response.status == 200) {
              $scope.attachments = response.data;
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
      candidateService.fetchCandidate($stateParams.id).then(
        function(response) {
          var arr = [];
          response.data.qualification = parseInt(response.data.qualification);
          response.data.attachment.forEach(function(key, value) {
            arr[key] = true;
          });
          response.data.attachment = arr;
          var birthDay = new Date(response.data.birth_day);
          response.data.birth_day =
            birthDay.getFullYear() +
            '-' +
            ('0' + (birthDay.getMonth() + 1)).slice(-2) +
            '-' +
            ('0' + birthDay.getDate()).slice(-2);
          $scope.editCandidateForm = response.data;
        },
        function(response) {
          toastr.error(
            'يوجد خطأ في جلب بيانات هذا المرشح, الرجاء الاتصال بمشرف المنضومة'
          );
          console.log('Something went wrong ' + response.data);
        }
      );

      $scope.editCandidate = function() {
        $scope.laddaStatus = true;
        console.log($scope.editCandidateForm.attachment);
        $scope.editCandidateForm.attachment = $.map(
          $scope.editCandidateForm.attachment,
          function(value, index) {
            console.log("s");
          }
        );
        console.log($scope.editCandidateForm.attachment);
       // for(var i  in $scope.editCandidateForm.attachment ){
       //  console.log(i)
       // }
        // candidateService
        //   .editCandidate($stateParams.id, $scope.editCandidateForm)
        //   .then(
        //     function(response) {
        //       if (response) {
        //         $timeout(function() {
        //           $scope.editCandidateForm = {};
        //           $scope.laddaStatus = false;
        //           toastr.info('تم التعديل بنجاح');
        //           $state.go('candidates');
        //         }, 500);
        //       } else {
        //         $scope.laddaStatus = false;
        //         toastr.error('خطأ في عملية التعديل, الرجاء اعادة المحاولة');
        //       }
        //     },
        //     function(response) {
        //       $scope.laddaStatus = false;
        //       toastr.error(
        //         'يوجد خطأ في تعديل هذا المرشح, الرجاء الاتصال بمشرف المنضومة'
        //       );
        //       console.log('Something went wrong ' + response.data);
        //     }
        //   );
      };
    }
  ]);
})();
