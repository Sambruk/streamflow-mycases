(function () {
  'use strict';

  var app = angular.module('sf.case-list.controllers', ['sf.common.services.customer', 'sf.common.services.backend']);

  app.controller('caseListOpenCtrl',
    ['$scope', '$location', 'customerService',
      function ($scope, $location, customerService) {
        $scope.cases = customerService.getOpenCases();
        $scope.openCaseClick = function (href) {
          $location.path("/open/" + href);
        }
      }
    ]
  );

  app.controller('caseListClosedCtrl',
    ['$scope', '$location', 'customerService',
      function ($scope, $location, customerService) {
        $scope.cases = customerService.getClosedCases();
        $scope.closedCaseClick = function(href) {
          $location.path("/closed/" + href);
        }
      }
    ]
  );

  app.controller('caseListContactCtrl',
    ['$scope', '$timeout', 'customerService',
      function ($scope, $timeout, customerService) {

        $scope.profileEdit = {};

        var startSpinner = function() {
          $scope.showworking = true;
          $scope.postfeedbacktext = "Skickar";
        };

        var stopSpinner = function() {
          $scope.showworking = false;
          $scope.postfeedbacktext = "";
        };

        var enterEditMode = function (b, texttoshow) {
          $scope.editcontactinfo = b;
          $scope.profileEdit.phone = $scope.profile.phoneNumber;
          $scope.profileEdit.email = $scope.profile.emailAddress;

          if (texttoshow) {
            $scope.feedbacktext = texttoshow;
            $timeout(function () {$scope.feedbacktext = "";}, 4000, true);
          }
        };

        $scope.change = function () {
          enterEditMode(true);
        };

        $scope.update = function () {
          startSpinner();

          var data = {email:$scope.profileEdit.email, phone:$scope.profileEdit.phone};
          customerService.updateProfile(data).then(function () {
            $scope.profile.invalidate();
            $scope.profile.resolve().then(function() {
              stopSpinner();
              enterEditMode(false, "Uppdatering klar.");
            });
          }, function(error) {
            stopSpinner();
            enterEditMode(false, "Uppdatering misslyckades (status " + error.status + ")");
          });
        };
        $scope.reset = function () {
          $scope.editphone = '';
          $scope.editemail = '';

          $scope.showworking = false;
          $scope.feedbacktext = "";

          enterEditMode(false);
        };

        $scope.reset();
      }]
  );

})();

