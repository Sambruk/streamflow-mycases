(function() {
  'use strict';

  describe("case list", function() {
    beforeEach(function() {
      browser().navigateTo('../../app/mock.html');
    });

    it("should automatically redirect to the /", function() {
      expect(browser().location().url()).toBe("/");
    });

    it("should display all open cases", function() {
      expect(repeater('.open-cases tr').column('case.caseId')).toEqual(["20121113-1","20121112-1"]);
    });

    it("should display all closed cases", function() {
      expect(repeater('.closed-cases tr').column('case.caseId')).toEqual(["20121114-2","20121114-1"]);
    });

    it("should display the name of the profile", function() {
      expect(element('.profile strong').html()).toBe("Henrik");
    });

    it("should display the name of the profile", function() {
      expect(element('.profile strong').html()).toBe("Henrik");
    });


    it("should display the case detail view when clicking on an open case", function() {
      element('.open-cases tr:nth-child(1)').click();  // click first case item
      expect(browser().location().url()).toBe("/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d");
    });

    describe("edit profile", function() {
      it("should update phone and email", function() {
        element('#profile-change-button').click();
        input('profileEdit.phone').enter('08-424242');
        input('profileEdit.email').enter('kalle@gmail.com');
        element('#profile-save-button').click();
//        expectToBe(this, element('#infoarea a').html(), 'kalle@gmail.com');
        // Can't really test this
//        expect(element('#infoarea a').html()).toBe("kalle@gmail.com");
//        expect(binding('profile.phoneNumber')).toBe("08-424242");
      });
    });
  });

  describe("case detail", function() {
    beforeEach(function() {
      browser().navigateTo('../../app/mock.html#/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d');
    });

    it("should contain header info for the case", function(){
      expect(element('.case-details:first dd').html()).toBe("Streamflow");
      expect(element('.case-details').count()).toBe(5);
    });

    it("should display tabs for available conversations ", function() {
      expect(repeater('#conversation-tab li').count()).toBe(2);
    });

    it("should show messages", function() {
      expect(binding('msg.user')).toBe("MyName");
      expect(repeater('#conversation-messages').count()).toBe(3);
    });

    describe('clicking on a conversation tab', function() {
      beforeEach(function() {
        element('#conversation-tab li:nth-child(2) a').click();  // click first case item
      });

      it("should change the URL", function() {
        expect(browser().location().url()).toBe("/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/fake-b8ef-4c56-99a8-3b9b5f2e7159-d");
      });

      it("should update the messages displayed", function() {
        expect(binding('msg.user')).toBe("Andreas");
        expect(binding('msg.text')).toBe("Jo men visst bla bla bla");
        expect(repeater('#conversation-messages').count()).toBe(1); //hmm ?
      });

    });
  });
})();


