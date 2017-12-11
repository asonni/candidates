(function() {
  'use strict';
  var app = angular.module('candidates');
  app.controller('reportsCtrl', [
    '$scope',
    '$modal',
    '$timeout',
    'toastr',
    'helpers',
    'reportService',
    function($scope, $modal, $timeout, toastr, helpers, reportService) {
      $scope.laddaModal = false;
      $scope.required = true;
      $scope.unrequired = false;
      $scope.reportObj = {};
      $scope.elections = [];
      var fullDate = new Date();
      var printDate =
        fullDate.getFullYear() +
        '-' +
        ('0' + (fullDate.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + fullDate.getDate()).slice(-2);
      pdfMake.fonts = {
        JFFlat: {
          normal: 'JF-Flat-regular.ttf',
          bold: 'JF-Flat-medium.ttf',
          italics: 'JF-Flat-regular.ttf',
          bolditalics: 'JF-Flat-regular.ttf'
        }
      };
      $scope.fetchElections = function() {
        reportService.fetchElections().then(
          function(response) {
            if (response.status == 200) {
              $scope.elections = response.data;
              console.log($scope.elections);
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
      $scope.fetchElections();
      $scope.showReportRegistrationProcessModal = function() {
        $scope.reportObj.reportType = 'report1';
        $scope.modalTitle = 'طباعة تقرير عملية التسجيل';
        $scope.registrationProcessModal = $modal({
          scope: $scope,
          templateUrl: 'pages/report/registrationProcessModal.html',
          show: true
        });
      };
      $scope.confirmRegistrationProcess = function() {
        $scope.printRegistrationProcess();
      };
      $scope.printRegistrationProcess = function() {
        function bulidItemBody() {
          var body = [
            [
              {
                text: helpers.leftToRight('العدد الكلي للمترشحين'),
                colSpan: 6
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {
                text: helpers.leftToRight('التنافس الخاص')
              },
              {
                text: helpers.leftToRight('التنافس العام'),
                colSpan: 3
              },
              {},
              {},
              {
                text: 'التاريخ',
                colSpan: 3
              },
              {},
              {}
            ],
            [
              {
                text: 'الاجمالي',
                colSpan: 2
              },
              {},
              {
                text: 'الخاص'
              },
              {
                text: 'العام',
                colSpan: 3
              },
              {},
              {},
              {
                text: helpers.leftToRight('المجموع الكلي')
              },
              {
                text: 'النساء'
              },
              {
                text: 'الكلي'
              },
              {
                text: 'انثى'
              },
              {
                text: 'ذكر'
              },
              {
                text: helpers.leftToRight('اللجنة الانتخابية')
              },
              {
                text: helpers.leftToRight('الدائرة الرئيسية')
              },
              {
                text: 'ر.ت'
              }
              // {},
              // {
              //   text: helpers.leftToRight('التنافس الخاص')
              // },
              // {
              //   text: helpers.leftToRight('التنافس العام'),
              //   colSpan: 3
              // },
              // {},
              // {},
              // {
              //   text: 'التاريخ',
              //   colSpan: 3
              // },
              // {},
              // {}
            ],
            [
              {
                text: 'انثى'
              },
              {
                text: 'ذكر'
              },
              {
                text: 'النساء'
              },
              {
                text: 'المجموع'
              },
              {
                text: 'اناث'
              },
              {
                text: 'ذكور'
              },
              {},
              {},
              {},
              {},
              {},
              {},
              {},
              {}
            ]
          ];
          // for (var i = 0; i < $scope.candidates.length; i++) {
          //   body.push([
          //     {
          //       text: $scope.candidates[i].phone
          //     },
          //     {
          //       text: helpers.reduceDate($scope.candidates[i].birth_day)
          //     },
          //     {
          //       text: $scope.candidates[i].gender === 1 ? 'ذكر' : 'انثي'
          //     },
          //     {
          //       text: helpers.leftToRight($scope.candidates[i].mother_name)
          //     },
          //     {
          //       text: helpers.leftToRight(
          //         $scope.candidates[i].f_name +
          //           ' ' +
          //           $scope.candidates[i].p_name +
          //           ' ' +
          //           $scope.candidates[i].g_name +
          //           ' ' +
          //           $scope.candidates[i].l_name
          //       )
          //     },
          //     {
          //       text: $scope.candidates[i].cra
          //     },
          //     {
          //       text: $scope.candidates[i].nid
          //     },
          //     {
          //       text: i + 1
          //     }
          //   ]);
          // }
          return body;
        }
        var registrationProcess = {
          pageSize: 'A4',
          pageOrientation: 'landscape',
          content: [
            {
              columns: [
                {
                  text: helpers.leftToRight(
                    'المفوضية الوطنية العليا للانتخابات'
                  ),
                  style: 'headerStyle'
                }
              ]
            },
            {
              columns: [
                {
                  text: helpers.leftToRight('قسم تسجيل المرشحين'),
                  style: 'leftHeaderStyle'
                },
                {
                  text: helpers.leftToRight('تقرير عملية التسجيل'),
                  style: 'rightHeaderStyle'
                }
              ]
            },
            {
              table: {
                headerRows: 2,
                widths: [
                  35,
                  35,
                  35,
                  35,
                  35,
                  35,
                  '*',
                  '*',
                  25,
                  25,
                  25,
                  '*',
                  '*',
                  20
                ],
                body: bulidItemBody()
              },
              layout: {
                hLineColor: function(i) {
                  return i === 0 || i === 1 || i === 10 + 1 ? 'black' : '#aaa';
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
            leftHeaderStyle: {
              fontSize: 13,
              alignment: 'left',
              margin: [0, 15, 0, 10]
            },
            rightHeaderStyle: {
              fontSize: 13,
              alignment: 'right',
              margin: [0, 15, 0, 10]
            }
          },
          defaultStyle: {
            fontSize: 8,
            font: 'JFFlat',
            alignment: 'center'
          }
        };
        pdfMake.createPdf(registrationProcess).open();
      };
    }
  ]);
})();
