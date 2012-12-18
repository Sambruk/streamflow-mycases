(function () {
  'use strict';

  describe('sf.common.filters', function () {

    beforeEach(module('sf.common.filters'));

    var TODAY = '2008-04-14T12:04:34.220Z';
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

      it("returns the formated date like 2008-04-14", inject(function (sfDateFilter) {
        expect(sfDateFilter(NOT_TODAY)).toBe('2012-05-01');
      }));
    });
  });
})();
