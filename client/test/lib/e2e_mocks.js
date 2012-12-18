(function() {
  'use strict';

  var mockMain = angular.module('sf.controllers.mock', ['sf.main.controllers']);
  mockMain.config(function ($provide) {
    $provide.decorator('$httpBackend', angular.mock.e2e.$httpBackendDecorator);
  });

  // see https://groups.google.com/forum/?fromgroups=#!topic/angular/grbwk-VehDE
  mockMain.run(function ($httpBackend) {
    $httpBackend.whenPOST(/profile\/update$/).respond(function(method, url, data, headers){
      console.log("POSTED " + method + " URL: " + url);
      console.log(data);
      return [200, '', ''];
    });
    $httpBackend.whenGET(/.*/).passThrough();
  });

})();