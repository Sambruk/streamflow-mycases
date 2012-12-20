(function(){
  'use strict';

  var main = angular.module('sf.main.controllers', ['sf.common.filters', 'sf.case-list.controllers', 'sf.case-detail.controllers', 'sf.common.services.inactivity']);

   // TODO $location not needed
  main.controller('mainCtrl',
    ['$scope', '$templateCache', '$http', '$location', 'customerService', 'inactivityService',
      function ($scope, $templateCache, $http, $location, customerService, inactivityService) {
        console.log("init mainCtrl");
        $scope.profile = customerService.getProfile();
        $scope.logoutUrl = customerService.logoutUrl();

        // initialize template cache
        $http.get('modules/case-detail/view/case-detail.html', {cache:$templateCache})
        $http.get('modules/case-list/view/case-list.html', {cache:$templateCache});

        inactivityService.start(function() {
          var logoutUrl = '/saml/logout'; // todo
          console.log("LOGOUT '" + logoutUrl + "'");
          document.location.href = logoutUrl;
        });
      }
    ]
  ).config(['$routeProvider', '$locationProvider', function ($routeProvider) {
    $routeProvider.
      when('/', {templateUrl:'modules/case-list/view/case-list.html'}).
      when('/:caseType/:caseId/:conversationId', {templateUrl:'modules/case-detail/view/case-detail.html'}).
      otherwise({redirectTo:'/'});
    // $locationProvider.html5Mode(true);
  }]);
})();
