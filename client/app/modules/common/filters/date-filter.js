(function () {
  'use strict';

  var sfFilters = angular.module('sf.common.filters.date', []);

  sfFilters.filter('sfDate', ['$filter', function($filter) {
    var date = $filter('date');

    return function(input) {
      var currentDate = new Date();
      var day = currentDate.getDate();
      var month = currentDate.getMonth();
      var year = currentDate.getFullYear();
      var d = new Date(input);

      var today = (d.getDate() == day && d.getFullYear() == year && d.getMonth() == month);
      return (today) ? date(input, 'HH:mm') : date(input, 'yyyy-MM-dd');
    };
  }]);
})();
