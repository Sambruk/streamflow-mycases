(function() {
  'use strict';

  describe('sf.case-list.controllers', function() {

    beforeEach(module('sf.case-list.controllers'));

    describe('caseListContactCtrl', function() {
      var scope;
      var profile;
      beforeEach(inject(function ($controller, $location, customerService) {
        scope = {};
        profile = {};
        scope.profile = profile;
        spyOn(customerService, 'getProfile').andReturn(profile);
        $controller('caseListContactCtrl', {$scope:scope});
      }));

      it("sets the profile scope variable", function() {
        expect(scope.profile).toBe(profile);
      });

      it("#change - copies the profileEdit.phone and profileEdit.email scope variables", function() {
        // given
        expect(scope.profileEdit.phone).toBe(undefined);
        expect(scope.profileEdit.email).toBe(undefined);

        // when
        scope.profile = {phoneNumber: '123', emailAddress: 'a@b.c'};
        scope.change();

        // then
        expect(scope.profileEdit.phone).toBe('123');
        expect(scope.profileEdit.email).toBe('a@b.c');
      });

      it('$update - calls the updateProfile method', inject(function(customerService) {
        // given
        var promise = { then: function(callback) {callback();}};
        scope.profileEdit.email = 'my@email.se';
        scope.profileEdit.phone = '4242';
        spyOn(customerService, 'updateProfile').andReturn(promise);

        // mock the profile invalidate and resolve methods
        profile.invalidate =  function() {};
        profile.resolve =  function() {};
        spyOn(profile, 'invalidate');
        spyOn(profile, 'resolve').andReturn({ then: function(){ }}); // mock the promise

        // when
        scope.update();

        // then
        expect(customerService.updateProfile).wasCalledWith({ email : 'my@email.se', phone : '4242' });
        expect(scope.profile.invalidate).wasCalled();
        expect(scope.profile.resolve).wasCalled();

      }));
    });

    describe('caseListClosedCtrl', function() {
      var scope;

      beforeEach(inject(function ($controller, $location, customerService) {
        scope = {};
        spyOn(customerService, 'getClosedCases').andReturn("blabla123");
        $controller('caseListClosedCtrl', {$scope:scope});
      }));

      it("sets the cases scope", function () {
        expect(scope.cases).toBe("blabla123");
      });

      it("the closedCaseClick function changes the $location", inject(function($location) {
        spyOn($location, 'path');
        scope.closedCaseClick('theCaseId');
        expect($location.path).wasCalledWith('/closed/theCaseId');
      }));
    });

    describe('caseListOpenCtrl', function () {
      var scope = {};

      beforeEach(inject(function ($controller, $location, customerService) {
        spyOn(customerService, 'getOpenCases').andReturn("blabla123");
        $controller('caseListOpenCtrl', {$scope:scope});
      }));

      it("sets the cases scope", function () {
        expect(scope.cases).toBe("blabla123");
      });

      it("the openCaseClick function changes the $location", inject(function($location) {
        spyOn($location, 'path');
        scope.openCaseClick('theCaseId');
        expect($location.path).wasCalledWith('/open/theCaseId');
      }));
    });
  });
}).call(this);
