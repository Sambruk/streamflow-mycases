(function () {
  'use strict';

  var sfServices = angular.module('sf.common.services.error-handler', []);

  sfServices.factory('errorHandler', ['$window', '$q', function ($window, $q) {
    return function(error) {
      if (error.status && error.status == 403) {
        console.log("RELOAD WINDOW");
        $window.location.reload();
      }
      return $q.reject(error);
    }
  }]);
})();