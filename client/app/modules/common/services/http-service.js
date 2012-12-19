(function() {

  var sfServices = angular.module('sf.common.services.http', []);

  sfServices.factory("httpService", ['$q', '$cacheFactory', '$location', '$http', function ($q, $cacheFactory, $location, $http) {
    var url = $location.absUrl();
    var li = url.lastIndexOf($location.path());
    var index = url.substring(0, li);
    var baseUrl = index.substring(0, index.lastIndexOf("/")) + "/api/proxy/";

    var cache = $cacheFactory('sfHttpCache');

    function makeBaseAuth(user, password) {
      var tok = user + ':' + password;
      var hash = Base64.encode(tok);
      return "Basic " + hash;
    }

    return {

      // When using the real streamflow server in the test_folder:
      //"baseUrl": 'http://localhost:8082/streamflow/surface/customers/197606030001/',
      "baseUrl":baseUrl,

      timeout: 10000,

      info: function() {
        return cache.info();
      },

      absUrl: function(href) {
        return this.baseUrl + href;
      },

      isCached: function(href) {
        return !!cache.get(href);
      },

      invalidate: function(hrefs) {
        hrefs.forEach(function(href) { cache.remove(href)});
      },

      getRequest: function (href) {
        var headers = {'Authorization':makeBaseAuth('administrator', 'administrator')};
        var url = this.absUrl(href);

        var result = cache.get(href);
        if (! result) {
          return $http({method:'GET', url:url, cache:false, headers:headers, timeout: this.timeout}).then(function(response) {
            cache.put(href, response);
            return response;
          });
        } else {
          var deferred = $q.defer();
          deferred.resolve(result);
          return deferred.promise;
        }
      },

      postRequest: function (href, data) {
        var params = $.param(data);
        return $http({
          method: 'POST',
          url: this.absUrl(href),
          timeout: this.timeout,
          data: params,
          headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
      }


    }

  }])
})();