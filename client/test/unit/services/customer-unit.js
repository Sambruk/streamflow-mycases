describe("sf.common.services.customer", function () {
  'use strict';

  var backend = window.mockBackend;

  beforeEach(module('sf.common.services.customer'));

  beforeEach(function() {
    this.addMatchers({
      isEmpty: function() {
        if (Object.keys(this.actual).length > 2) {
          this.message = function(){
            return "Expected empty object but got " + Object.keys(this.actual) + "";
          };
          return false;
        }


        if (this.actual.length != 0) {
          this.message = function(){
            return "Expected size " + this.actual.length + " to be " + 0;
          };
          return false;
        }

        return true;
      }

    });
  });

  beforeEach(inject(function(httpService, navigationService) {
    httpService.baseUrl = 'mock/';
    spyOn(navigationService, 'caseId').andReturn('f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0');
  }));

  describe("customerService", function(){

    describe("getProfile", function() {

      it("returns the profile", inject(function (customerService, $httpBackend, httpService) {
        // Given
        $httpBackend.expectGET('mock/').respond(backend.customer);
        $httpBackend.expectGET('mock/profile/').respond(backend.profile);

        // When
        var response = customerService.getProfile();

        // Then
        expect(response).isEmpty();

        // When
        $httpBackend.flush();

        // Then
        expect(response.name).toEqual("Henrik");
        expect(response.phoneNumber).toEqual("46701476168");
        expect(response.address).toEqual("Tussilagovägen 1");
      }));

    });

    describe("updateProfile", function() {

      it("updates the profile", inject(function (customerService, $httpBackend) {
        // Given and Then
        $httpBackend.expectGET('mock/').respond(backend.customer);
        $httpBackend.expectGET('mock/profile/').respond(backend.profile);
        $httpBackend.expectPOST('mock/profile/update', "phone=1234").respond("Japp");

        // When
        customerService.updateProfile({phone: 1234});
        $httpBackend.flush();
      }));

    });


    describe("createNewMessage", function() {

      beforeEach(inject(function(navigationService) {
        spyOn(navigationService, 'caseType').andReturn('open');
      }));

      describe("when not selected a message", function() {
        beforeEach(inject(function(navigationService) {
          spyOn(navigationService, 'conversationId').andReturn('');
        }));

        it("should create the first message and change the conversation id URL in the location bar", inject(function (customerService, navigationService, $httpBackend) {
          spyOn(navigationService, 'setConversationId');

          // Given and Then
          $httpBackend.expectGET('mock/').respond(backend.customer);
          $httpBackend.expectGET('mock/open/').respond(backend.open);
          $httpBackend.expectGET('mock/open/cases').respond(backend.cases);
          $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/').respond(backend.caseDetailNoConversations);
          $httpBackend.expectPOST('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/createconversation', "firstmessage=hejsan").respond(backend.postFirstMessageResponse);
          // When

          customerService.createNewMessage({message: "hejsan"});
          $httpBackend.flush();

          expect(navigationService.setConversationId).wasCalledWith('928e6766-d7b4-4f53-b41e-8e433d710f0f-10a');
        }));
      });

      describe("when one message is selected", function() {
        beforeEach(inject(function(navigationService) {
          spyOn(navigationService, 'conversationId').andReturn('f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d');
        }));

        it("should create the first message", inject(function (customerService, $httpBackend) {
          // Given and Then
          $httpBackend.expectGET('mock/').respond(backend.customer);
          $httpBackend.expectGET('mock/open/').respond(backend.open);
          $httpBackend.expectGET('mock/open/cases').respond(backend.cases);
          $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/').respond(backend.caseDetail1);
           $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/').respond(backend.conversation1);
          $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/').respond(backend.conversationDetail1);
          $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/messages/').respond(backend.conversation1Messages);
          $httpBackend.expectPOST('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/messages/createmessage', "string=hopp").respond("Japp");
          // When
          customerService.createNewMessage({message: "hopp"});
          $httpBackend.flush();
        }));
      });


    });

    describe('getOpenCases', function(){
      it("returns the open cases", inject(function (customerService, $httpBackend) {
        // Given
        $httpBackend.expectGET('mock/').respond(backend.customer);
        $httpBackend.expectGET('mock/open/').respond(backend.open);
        $httpBackend.expectGET('mock/open/cases').respond(backend.cases);

        // When
        var response = customerService.getOpenCases();

        // Then
        expect(response).isEmpty();

        // When
        $httpBackend.flush();

        // Then
        expect(response[0].href).toEqual('f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/');
      }));
    });

    describe('getCaseDetail for open cases', function(){
      it("returns the open case detail", inject(function (customerService, navigationService, $httpBackend) {
        // Given
        $httpBackend.expectGET('mock/').respond(backend.customer);
        $httpBackend.expectGET('mock/open/').respond(backend.open);
        $httpBackend.expectGET('mock/open/cases').respond(backend.cases);
        $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/').respond(backend.caseDetail1);
        spyOn(navigationService, 'caseType').andReturn('open');

        // When
        var response = customerService.getCaseDetail();

        // Then
        expect(response).isEmpty();

        // When
        $httpBackend.flush();

        // Then
        expect(response.createdBy).toEqual('Henrik');
      }));
    });

    describe('getClosedCases', function(){
      it("returns the closed cases", inject(function (customerService, $httpBackend) {
        // Given
        $httpBackend.expectGET('mock/').respond(backend.customer);
        $httpBackend.expectGET('mock/closed/').respond(backend.open);
        $httpBackend.expectGET('mock/closed/cases').respond(backend.cases);

        // When
        var response = customerService.getClosedCases();

        // Then
        expect(response).isEmpty();

        // When
        $httpBackend.flush();

        // Then
        expect(response[0].href).toEqual('f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/');
      }));
    });


    describe('getCaseLog', function(){
      it("returns the list of logs", inject(function (customerService, $httpBackend, navigationService) {
        // Given
        $httpBackend.expectGET('mock/').respond(backend.customer);
        $httpBackend.expectGET('mock/open/').respond(backend.open);
        $httpBackend.expectGET('mock/open/cases').respond(backend.cases);
        $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/').respond(backend.caseDetail1);
        $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/caselog').respond(backend.caseDetail1Log);
        spyOn(navigationService, 'caseType').andReturn('open');

        // When
        var response = customerService.getCaseLog();

        // Then
        expect(response).isEmpty();

        // When
        $httpBackend.flush();

        // Then
        expect(response.map(function(d){ return d.text})).toEqual(['Removed case type', 'Set case type to formulärstest', 'Opened', 'Här har vi också ett eget meddelande']);
      }));
    });

    describe('getConversations', function(){
      it("returns the list of logs", inject(function (customerService, $httpBackend, navigationService) {
        // Given
        $httpBackend.expectGET('mock/').respond(backend.customer);
        $httpBackend.expectGET('mock/open/').respond(backend.open);
        $httpBackend.expectGET('mock/open/cases').respond(backend.cases);
        $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/').respond(backend.caseDetail1);
        $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/').respond(backend.conversation1);
        spyOn(navigationService, 'caseType').andReturn('open');
        spyOn(navigationService, 'conversationHREF').andReturn('case13/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/');
        spyOn(navigationService, 'conversationId').andReturn('');

        // When
        var response = customerService.getConversations();

        // Then
        expect(response).isEmpty();

        // When
        $httpBackend.flush();

        // Then
        expect(response.map(function(d){ return d.text})).toEqual(['Testkonversation']);
        expect(response.map(function(d){ return d.href})).toEqual(['case13/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/']);
        expect(response.map(function(d){ return d.class})).toEqual(['active']);
        expect(navigationService.conversationHREF).wasCalledWith('f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/');
      }));


      describe('getConversationMessages', function(){
        describe("when no messages", function() {

          it("returns an empty message array with invalidate and resolve methods", inject(function (customerService, $httpBackend, navigationService) {
            // Given
            spyOn(navigationService, 'caseType').andReturn('open');
            spyOn(navigationService, 'conversationId').andReturn('f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d');
            var conversationId = '';
            navigationService.conversationId = function() { return conversationId};

            // When
            var response = customerService.getConversationMessages();

            // Then
            expect(response).isEmpty();
            expect(response.length).toBe(0);

            // Given - now we resolve again and pretend that the conversationId is available
            $httpBackend.expectGET('mock/').respond(backend.customer);
            $httpBackend.expectGET('mock/open/').respond(backend.open);
            $httpBackend.expectGET('mock/open/cases').respond(backend.cases);
            $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/').respond(backend.caseDetail1);
            $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/').respond(backend.conversation1);
            $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/').respond(backend.conversationDetail1);
            $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/messages/').respond(backend.conversation1Messages);

            conversationId = 'f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d'
            response.invalidate();
            response.resolve();

            // When
            $httpBackend.flush();
            expect(response.length).toBe(3);
          }));
        });

        describe("when there is already one or more messages", function() {
          it("returns the list of messages", inject(function (customerService, $httpBackend, navigationService) {
            // Given
            $httpBackend.expectGET('mock/').respond(backend.customer);
            $httpBackend.expectGET('mock/open/').respond(backend.open);
            $httpBackend.expectGET('mock/open/cases').respond(backend.cases);
            $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/').respond(backend.caseDetail1);
            $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/').respond(backend.conversation1);
            $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/').respond(backend.conversationDetail1);
            //$httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/participants/').respond(backend.conversation1Participants);
            $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/messages/').respond(backend.conversation1Messages);

            spyOn(navigationService, 'caseType').andReturn('open');
            spyOn(navigationService, 'conversationId').andReturn('f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d');

            // When
            var response = customerService.getConversationMessages();

            // Then
            expect(response).isEmpty();

            // When
            $httpBackend.flush();

            // Then
//          expect(response.participants.map(function(d){ return d.text})).toEqual(['MyName']);
            expect(response.length).toBe(3);
            expect(response[0].text).toEqual('Ett första meddelande...');
          }))
        });
      });

    });

    describe('getConversationParticipants', function(){
      it("returns the list of participants", inject(function (customerService, $httpBackend, navigationService) {
        // Given
        $httpBackend.expectGET('mock/').respond(backend.customer);
        $httpBackend.expectGET('mock/open/').respond(backend.open);
        $httpBackend.expectGET('mock/open/cases').respond(backend.cases);
        $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/').respond(backend.caseDetail1);
        $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/').respond(backend.conversation1);
        $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/').respond(backend.conversationDetail1);
        $httpBackend.expectGET('mock/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/participants/').respond(backend.conversation1Participants);

        spyOn(navigationService, 'caseType').andReturn('open');
        spyOn(navigationService, 'conversationId').andReturn('f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d');

        // When
        var response = customerService.getConversationParticipants();

        // Then
        expect(response).isEmpty();

        // When
        $httpBackend.flush();

        // Then
//          expect(response.participants.map(function(d){ return d.text})).toEqual(['MyName']);
        expect(response.length).toBe(1);
        expect(response[0].name).toEqual('MyName');
      }))});

  });

});

