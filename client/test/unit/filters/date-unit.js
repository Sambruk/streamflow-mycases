(function () {
  'use strict';

  describe('sf.common.filters', function () {

    beforeEach(module('sf.common.filters'));

    var TODAY = '2008-04-14T12:04:34.220Z';
    var THIS_YEAR = '2008-08-07T12:04:34.220Z'
    var NOT_TODAY = '2012-05-01T12:04:34.220Z';

    describe('sfDate', function () {

      var oldDate;

      beforeEach(function() {
        oldDate = Date;
        Date = function ()
        {
          // This works in Chrome, but probably not in Firefox
          return (arguments.length === 0) ? new oldDate(TODAY) : new oldDate(arguments[0]);
        }
      });
      afterEach(function(){
        Date = oldDate;
      });

      it("returns the formated date like 14:04 if it's today", inject(function (sfDateFilter) {
        expect(sfDateFilter(TODAY)).toBe('14:04');
      }))

      it("returns the formated date like 7:e augusti", inject(function (sfDateFilter) {
        expect(sfDateFilter(THIS_YEAR)).toBe('7:e augusti');
      }));

      it("returns the formated date like 5:e maj 2012", inject(function (sfDateFilter) {
        expect(sfDateFilter(NOT_TODAY)).toBe('1:a maj 2012');
      }));

      it("returns the formated date like 1:a, 2:a 3:e", inject(function (sfDateFilter) {
        expect(sfDateFilter('2008-12-01T12:04:34.220Z')).toBe('1:a december');
        expect(sfDateFilter('2008-12-02T12:04:34.220Z')).toBe('2:a december');
        expect(sfDateFilter('2008-12-03T12:04:34.220Z')).toBe('3:e december');
      }));

    });
  });
})();
