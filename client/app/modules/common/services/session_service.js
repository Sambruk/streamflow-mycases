(function() {

  var sfServices = angular.module('sf.common.services.session', ['sf.common.services.http']);

  var idleInterval; // just to make sure its only called once

  sfServices.factory("sessionService", ['$location', '$http', 'httpService', '$window', function ($location, $http, httpService, $window) {
    var idle = 0;

    function stopMonitorUserActivity() {
      clearInterval(idleInterval);
      idleInterval = undefined;
      idle = 0;
    }

    function startMonitorUserActivity() {

      if (idleInterval) {
        console.log("Already started startMonitorUserActivity");
        return;
      }

      function timerIncrement() {
        idle += 1;
        // as long as the user is active poll the server in order to keep the connection alive
        if (idle < 10) {
          httpService.getRequest('', true); // force the session alive with a get request
        }

        // when user has been inactive for too long do a http GET request which will trigger a reload since you will receive a 403
        if (idle > 10) {
          logout();
        }
      }

      idleInterval = setInterval(timerIncrement, 60000); // 1 minute

      //Zero the idle timer on mouse movement.
      $($window).mousemove(function (e) { idle = 0; });
      $($window).keypress(function (e) { idle = 0; });
    }

    function logoutUrl() {return httpService.baseUrl + '/saml/logout';}

    function logout() {
      stopMonitorUserActivity();
      console.log("LOGOUT '" + logoutUrl() + "'");
      document.location.href = logoutUrl();
    }

    return {
      start: startMonitorUserActivity,
      stop: stopMonitorUserActivity,
      logoutUrl : logoutUrl
    };
  }]);

})();