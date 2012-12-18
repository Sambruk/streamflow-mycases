describe("sf.common.services.error-handler", function () {
  'use strict';

  beforeEach(module('sf.common.services.error-handler'));

  it("does nothing on a 404 request", inject(function (errorHandler, $window) {
    $window.spyOn($window.location, 'reload');
    var error = {status:404};
    errorHandler(error);
    expect($window.location.reload).not.toHaveBeenCalled();
  }));

  it("should reload the window on a 403 request", inject(function (errorHandler, $window) {
    $window.spyOn($window.location, 'reload');
    var error = {status:403};
    errorHandler(error);
    expect($window.location.reload).toHaveBeenCalled();
  }));
});
