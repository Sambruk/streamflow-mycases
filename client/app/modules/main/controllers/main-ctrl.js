(function(){
  'use strict';

  var main = angular.module('sf.main.controllers', ['sf.common.filters', 'sf.case-list.controllers', 'sf.case-detail.controllers', 'sf.common.services.session']);

  main.controller('mainCtrl',
    ['$scope', '$templateCache', '$http', 'customerService', 'sessionService',
      function ($scope, $templateCache, $http, customerService, sessionService) {
        $scope.profile = customerService.getProfile();
        $scope.logoutUrl = sessionService.logoutUrl();

        // initialize template cache
        $http.get('modules/case-detail/view/case-detail.html', {cache:$templateCache})
        $http.get('modules/case-list/view/case-list.html', {cache:$templateCache});
        sessionService.start();
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
