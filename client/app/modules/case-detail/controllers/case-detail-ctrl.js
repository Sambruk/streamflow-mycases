(function() {
  'use strict';

  var app = angular.module('sf.case-detail.controllers', ['sf.common.services.customer', 'sf.common.services.backend']);

  app.controller('caseDetailsHeader',
    ['$scope', 'customerService',
      function ($scope, customerService) {
        $scope.caseDetail = customerService.getCaseDetail();
      }
    ]);

  app.controller('caseDetailsLog',
    ['$scope', 'customerService',
      function ($scope, customerService) {
        $scope.logs = customerService.getCaseLog();
      }
    ]);

  app.controller('caseDetailsConversation',
    ['$scope', '$timeout', 'customerService','$q',
      function ($scope, $timeout, customerService, $q) {

        $scope.showworking = false;
        $scope.feedbacktext = "";
        $scope.newreply = "";

        $scope.conversations = customerService.getConversations();

        $scope.participants = customerService.getConversationParticipants();

        $scope.messages = customerService.getConversationMessages();

        var startSpinner = function() {
          $scope.showworking = true;
          $scope.feedbacktext = "Skickar";
        };

        var stopSpinner = function(msg) {
          $scope.showworking = false;
          $scope.feedbacktext = msg || "Meddelandet har skickats.";
          $timeout(function () {$scope.feedbacktext = "";}, 4000, true);
        };

        $scope.save = function () {

          var newreply = $scope.newreply;

          if (newreply.length > 0) {

            startSpinner();

            var data = {message: newreply};
            customerService.createNewMessage(data).then(function () {
              $scope.conversations.invalidate();
              $scope.messages.invalidate();
              console.log("Conversations resolve");
              return $scope.conversations.resolve();
            }, function(error){
              console.log("Can't update conversation", error);
              stopSpinner("Kan ej skicka meddelandet (felkod :" + error.status + ")");
              var deferred = $q.defer();
              deferred.reject({msg: "FELKOD " + error.status, error: error}); // TODO maybe move this
              return deferred.promise;
            }).then(function() {
                $scope.messages.resolve().then(function() {
                  console.log("RESOLVED, stop spinner");
                  stopSpinner();
                  $scope.newreply = "";
                });
              }, function(error) {
                console.log("ERROR", error);
              });
          }
        };

        $scope.cancel = function () {
          $scope.newreply = "";
        };

      }
    ]);

})();
