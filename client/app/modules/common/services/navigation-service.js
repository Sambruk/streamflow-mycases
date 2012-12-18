(function () {
  'use strict';


  var sfServices = angular.module('sf.common.services.navigation', []);

  sfServices.factory('navigationService', ['$location', '$routeParams', function ($location, $routeParams) {

    return {
      conversationHREF: function(conversationId) {
        return this.caseType() + '/' + this.caseId() + '/' + conversationId;
      },

      caseId: function() {
        return $routeParams.caseId;
      },
      caseType: function() {
        return $routeParams.caseType;
      },

      conversationId: function() {
        return $routeParams.conversationId;
      },

      setConversationId: function(id) {
        $location.path(this.caseType() + '/' + this.caseId() + '/' + id  );
      }
    };
  }]);


})();
