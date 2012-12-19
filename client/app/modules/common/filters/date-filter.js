(function () {
  'use strict';

  var sfFilters = angular.module('sf.common.filters.date', []);

  var months = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];

  function dayAsString(n) {
    return (n < 3) ? n + ":a" : n + ":e";
  }

  function swedishDate(date, currentYear) {
    var dayAndMonth = dayAsString(date.getDate()) + ' ' + months[date.getMonth()];
    return (currentYear !== date.getFullYear()) ? dayAndMonth + ' ' + date.getFullYear() : dayAndMonth;
  }

  sfFilters.filter('sfDate', ['$filter', function($filter) {
    var date = $filter('date');

    return function(input) {
      var currentDate = new Date();
      var day = currentDate.getDate();
      var month = currentDate.getMonth();
      var year = currentDate.getFullYear();
      var d = new Date(input);

      var today = (d.getDate() == day && d.getFullYear() == year && d.getMonth() == month);
      return (today) ? date(input, 'HH:mm') : swedishDate(d, year);
    };
  }]);
})();
