(function () {
  'use strict';


  var sfServices = angular.module('sf.common.services.customer', ['sf.common.services.backend', 'sf.common.services.navigation']);


  sfServices.factory('customerService', ['backendService', 'navigationService', function (backendService, navigationService) {

    return {
      getProfile: function() {
        return new backendService.get({
          specs: [{resources: 'profile'}],
          onSuccess: function(resource, result) {
            result.name = resource.response.index.name;
            if (resource.response.index.phoneNumbers.length > 0) {
              result.phoneNumber = resource.response.index.phoneNumbers[0].phoneNumber;
            }
            if (resource.response.index.addresses.length > 0) {
              result.address = resource.response.index.addresses[0].address;
              result.city = resource.response.index.addresses[0].city;
              result.zipCode = resource.response.index.addresses[0].zipCode;
            }
            if (resource.response.index.emailAddresses.length > 0) {
              result.emailAddress = resource.response.index.emailAddresses[0].emailAddress;
            }
          }
        });
      },

      logoutUrl: function() {
        return backendService.logoutUrl();
      },

      updateProfile: function(profile) {
        return backendService.postNested([{resources: 'profile'}, {commands: 'update'}], profile);
      },

      getOpenCases:function () {
        return backendService.get({
          specs: [{resources: 'open'}, {queries: 'cases'}],
          onSuccess: function(resource, result){
              resource.response.links.forEach(function(d) {result.push(d)});
            }
        });
      },

      getClosedCases:function () {
        return backendService.get({
          specs: [{resources: 'closed'}, {queries: 'cases'}],
          onSuccess: function(resource, result){
              resource.response.links.forEach(function(d) {result.push(d)});
            }
          }
        );
      },

      getCaseLog: function() {
        return backendService.get({
          specs: [
            {resources: navigationService.caseType()},
            {queries: 'cases'},
            {links: navigationService.caseId()},
            {queries: 'caselog'}],
          onSuccess: function(resource, result){
            resource.response.links.forEach(function(d) {result.push(d)});
          }});
      },

      getCaseDetail:function () {
        return backendService.get({
          specs: [
            {resources: navigationService.caseType()},
            {queries: 'cases'},
            {links: navigationService.caseId()}],
          onSuccess: function(resource, result, urls){
            _.each(['caseId', 'createdBy', 'creationDate', 'description', 'project', 'status'], function(item){
              result[item] = resource.response.index[item];
            });
            // is it closed then it has "closeDate" property, set status
            if (resource.response.index.closeDate) {
              result.status = 'CLOSED';
            }
            resource.getNested([{resources: 'submittedforms'}], urls).then(function(resource) {
              var links = resource.response.index.links;
              if (links && links.length > 0) {
                result.submittedFormText = links[0].text;
                result.submittedFormUrl  = resource.absApiUrl(links[0].href);
              }
            });
          }
        });
      },

      getConversations: function() {
        return backendService.get({
          specs: [
            {resources: navigationService.caseType()},
            {queries: 'cases'},
            {links: navigationService.caseId()},
            {resources: 'conversations'}],
          onSuccess: function(resource, result) {
            var cssClass = function(id) {
              return (id === navigationService.conversationId()) ? "active" : '';
            }
            resource.response.index.links.forEach(function(item) {
              result.push({text: item.text, id: item.id, href: navigationService.conversationHREF(item.href), 'class': cssClass(item.id)});
            });

            // Default is that the first tab should be selected if not specified in the URL
            if (! navigationService.conversationId() && result.length > 0) {
              navigationService.setConversationId(result[0].id);
              result[0]['class'] = 'active';
            }
          }});
      },


      getConversationMessages: function() {
        return backendService.get({
          specs: [
            {resources:navigationService.caseType()},
            {queries:'cases'},
            {links:navigationService.caseId()},
            {resources:'conversations'},
            {'index.links':navigationService.conversationId}, // this need to be a function, it will return ""
            {resources: 'messages'}
            ],
          condition: function() {return !!navigationService.conversationId()},
          onSuccess: function(resource, result){
            resource.response.index.links.forEach(function(item) {
              result.push({user: item.sender, text: item.text, id: item.id, createdOn: item.createdOn});
            });
        }});
      },

      createNewMessage: function(data) {
        if (navigationService.conversationId()) {
          return backendService.postNested([
            {resources:navigationService.caseType()},
            {queries:'cases'},
            {links:navigationService.caseId()},
            {resources:'conversations'},
            {'index.links':navigationService.conversationId()},
            {resources: 'messages'},
            {commands: 'createmessage'}
          ], {string: data.message});
        } else {
          return backendService.postNested([
            {resources:navigationService.caseType()},
            {queries:'cases'},
            {links:navigationService.caseId()},
            {commands: 'createconversation'}
          ], {firstmessage: data.message}, {'events.name': 'createdMessage'}).then(function(response) {
              console.log("GOT RESPONSE:", response);
              navigationService.setConversationId(response.entity);
              return response;
          });
        }
      },

      getConversationParticipants  : function() {
        if (!navigationService.conversationId()) {
          return;
        }
        return backendService.get({
          specs: [
            {resources:navigationService.caseType()},
            {queries:'cases'},
            {links:navigationService.caseId()},
            {resources:'conversations'},
            {'index.links':navigationService.conversationId()},
            {resources: 'participants'}
          ],
          onSuccess: function(resource, result){
            resource.response.index.links.forEach(function(item) {
              result.push({name: item.text, id: item.id});
            });
          }
        });
      }
    }

  }]);
})();