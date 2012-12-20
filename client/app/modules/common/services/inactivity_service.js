(function() {

  var sfServices = angular.module('sf.common.services.inactivity', ['sf.common.services.error-handler']);

  sfServices.factory("inactivityService", ['$location', '$http', 'errorHandlerService', '$window', function ($location, $http, errorHandlerService, $window) {
    var url = $location.absUrl(); // TODO refactor DRY
    var li = url.lastIndexOf($location.path());
    var index = url.substring(0, li);
    var baseUrl = index.substring(0, index.lastIndexOf("/"));
    var apiUrl = baseUrl + "/api/proxy/";

    var idle = 0;
    var idleInterval;
    console.log("Init inactivityService !");

    function stopMonitorUserActivity() {
      clearInterval(idleInterval);
      idleInterval = undefined;
      idle = 0;
    }

    function startMonitorUserActivity(onInactivityCallback) {
      console.log("startMonitorUserActivity");

      if (idleInterval) {
        console.log("Already started startMonitorUserActivity");
        return;
      }

      function timerIncrement() {
        idle += 1;
        // as long as the user is active poll the server in order to keep the connection alive
        if (idle < 10) {
          console.log("IDLE " + idle);
          $http({method:'GET', url:apiUrl, timeout:10000}).then(function () {
          }, errorHandlerService);
        }

        // when user has been inactive for too long do a http GET request which will trigger a reload since you will receive a 403
        if (idle > 10) {
          stopMonitorUserActivity();
          onInactivityCallback();
        }
      }

      idleInterval = setInterval(timerIncrement, 60000); // 1 minute

      //Zero the idle timer on mouse movement.
      $($window).mousemove(function (e) {
        idle = 0;
      });
      $($window).keypress(function (e) {
        idle = 0;
      });
    }

    return {
      start: startMonitorUserActivity,
      stop: stopMonitorUserActivity
    };
  }]);

})();