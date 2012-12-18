(function () {
  'use strict';

  var sfFilters = angular.module('sf.common.filters.translate', []);

  sfFilters.filter('sfTranslate', [function() {
    return function(input) {
      switch(input) {
        case 'OPEN':
          return "Öppen";
        case 'CLOSED':
          return "Stängd";
        default:
          return input;
      }
    };
  }]);
})();
