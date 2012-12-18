window.mockBackend = window.mockBackend || (function () {
  'use strict';

  var mockBackend = {};

  mockBackend.customer = {"commands":[], "index":null, "queries":[], "resources":[
    {
      "classes":"resource",
      "href":"profile/",
      "id":"profile",
      "rel":"profile",
      "text":"Profile"
    },
    {
      "classes":"resource",
      "href":"open/",
      "id":"open",
      "rel":"open",
      "text":"Open"
    },
    {
      "classes":"resource",
      "href":"closed/",
      "id":"closed",
      "rel":"closed",
      "text":"Closed"
    }
  ]};

  mockBackend.profile = {"commands":[
    {
      "classes":"command",
      "href":"changemessagedeliverytype",
      "id":"changemessagedeliverytype",
      "rel":"changemessagedeliverytype",
      "text":"Changemessagedeliverytype"
    },
    {
      "classes":"command",
      "href":"update",
      "id":"update",
      "rel":"update",
      "text":"Update"
    }
  ], "index":{
    "_type":"se.streamsource.streamflow.api.workspace.cases.contact.ContactDTO",
    "addresses":[
      {
        "address":"Tussilagovägen 1",
        "city":"Holm",
        "contactType":"HOME",
        "country":"Sweden",
        "region":"Halland",
        "zipCode":"302 79"
      }
    ],
    "company":"",
    "contactId":"",
    "contactPreference":null,
    "emailAddresses":[
      {
        "contactType":"HOME",
        "emailAddress":"henrik.reinhold@gmail.com"
      }
    ],
    "isCompany":false,
    "name":"Henrik",
    "note":"",
    "phoneNumbers":[
      {
        "contactType":"HOME",
        "phoneNumber":"46701476168"
      }
    ],
    "picture":""
  }, "queries":[
    {
      "classes":"query",
      "href":"messagedeliverytype",
      "id":"messagedeliverytype",
      "rel":"messagedeliverytype",
      "text":"Messagedeliverytype"
    },
    {
      "classes":"query",
      "href":"index",
      "id":"index",
      "rel":"index",
      "text":"Index"
    }
  ], "resources":[]}

  mockBackend.open = {"commands":[], "index":null, "queries":[
    {
      "classes":"query",
      "href":"cases",
      "id":"cases",
      "rel":"cases",
      "text":"Cases"
    }
  ], "resources":[]};

  mockBackend.cases = {"links":[
    {
      "_type":"se.streamsource.streamflow.surface.api.CaseListItemDTO",
      "classes":null,
      "href":"f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/",
      "id":"f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0",
      "rel":"mycases/opencase",
      "text":"Testärende 2",
      "caseId":"20121113-1",
      "caseType":"formulärstest",
      "creationDate":"2012-11-13T09:04:27.064Z",
      "project":"Streamflow"
    },
    {
      "_type":"se.streamsource.streamflow.surface.api.CaseListItemDTO",
      "classes":null,
      "href":"b35873ba-4007-40ac-9936-975eab38395a-30/",
      "id":"b35873ba-4007-40ac-9936-975eab38395a-30",
      "rel":"mycases/opencase",
      "text":"En rubrik här skulle inte vara så dumt",
      "caseId":"20121112-1",
      "caseType":"formulärstest",
      "creationDate":"2012-10-26T12:47:07.345Z",
      "project":"Streamflow"
    }
  ]};

  mockBackend.caseDetail1 = {"commands":[], "index":{
    "_type":"se.streamsource.streamflow.surface.api.OpenCaseDTO",
    "caseId":"20121112-1",
    "createdBy":"Henrik",
    "creationDate":"2012-10-26T12:47:07.345Z",
    "description":"En rubrik här skulle inte vara så dumt",
    "project":"Streamflow",
    "status":"OPEN"
  }, "queries":[
    {
      "classes":"query",
      "href":"index",
      "id":"index",
      "rel":"index",
      "text":"Index"
    },
    {
      "classes":"query",
      "href":"caselog",
      "id":"caselog",
      "rel":"caselog",
      "text":"Caselog"
    }
  ], "resources":[
    {
      "classes":"resource",
      "href":"submittedforms/",
      "id":"submittedforms",
      "rel":"submittedforms",
      "text":"Submittedforms"
    },
    {
      "classes":"resource",
      "href":"conversations/",
      "id":"conversations",
      "rel":"conversations",
      "text":"Conversations"
    }
  ]};

  mockBackend.caseDetailNoConversations = {
    "commands":[
      {
        "classes":"command",
        "href":"createconversation",
        "id":"createconversation",
        "rel":"createconversation",
        "text":"Createconversation"
      }
    ],
    "index":{
      "_type":"se.streamsource.streamflow.surface.api.OpenCaseDTO",
      "caseId":"20121112-1",
      "createdBy":"Henrik",
      "creationDate":"2012-10-26T12:47:07.345Z",
      "description":"En rubrik här skulle inte vara så dumt",
      "project":"Streamflow",
      "status":"OPEN"
    }, "queries":[
    {
      "classes":"query",
      "href":"index",
      "id":"index",
      "rel":"index",
      "text":"Index"
    },
    {
      "classes":"query",
      "href":"caselog",
      "id":"caselog",
      "rel":"caselog",
      "text":"Caselog"
    }
  ], "resources":[
    {
      "classes":"resource",
      "href":"submittedforms/",
      "id":"submittedforms",
      "rel":"submittedforms",
      "text":"Submittedforms"
    }
  ]};

  mockBackend.caseDetail1Log = {"links":[
    {
      "_type":"se.streamsource.streamflow.api.workspace.cases.caselog.CaseLogEntryDTO",
      "classes":null,
      "href":"",
      "id":"",
      "rel":null,
      "text":"Removed case type",
      "caseLogType":"system",
      "creationDate":"2012-10-26T14:07:46.797Z",
      "creator":"MyName",
      "message":"Removed case type",
      "myPagesVisibility":true
    },
    {
      "_type":"se.streamsource.streamflow.api.workspace.cases.caselog.CaseLogEntryDTO",
      "classes":null,
      "href":"",
      "id":"",
      "rel":null,
      "text":"Set case type to formulärstest",
      "caseLogType":"system",
      "creationDate":"2012-10-26T14:12:26.711Z",
      "creator":"MyName",
      "message":"Set case type to formulärstest",
      "myPagesVisibility":true
    },
    {
      "_type":"se.streamsource.streamflow.api.workspace.cases.caselog.CaseLogEntryDTO",
      "classes":null,
      "href":"",
      "id":"",
      "rel":null,
      "text":"Opened",
      "caseLogType":"system",
      "creationDate":"2012-11-12T14:20:47.547Z",
      "creator":"MyName",
      "message":"Opened",
      "myPagesVisibility":true
    },
    {
      "_type":"se.streamsource.streamflow.api.workspace.cases.caselog.CaseLogEntryDTO",
      "classes":null,
      "href":"",
      "id":"",
      "rel":null,
      "text":"Här har vi också ett eget meddelande",
      "caseLogType":"custom",
      "creationDate":"2012-11-13T10:31:44.024Z",
      "creator":"MyName",
      "message":"Här har vi också ett eget meddelande",
      "myPagesVisibility":true
    }
  ]};

  // http://localhost:8090/streamflow/surface/customers/197606030001/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/conversations/
  mockBackend.conversation1 =  {"commands":[], "index":{
    "_type":"se.streamsource.dci.value.link.LinksValue",
    "links":[
      {
        "_type":"se.streamsource.streamflow.api.workspace.cases.conversation.ConversationDTO",
        "classes":null,
        "href":"f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d/",
        "id":"f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-d",
        "rel":null,
        "text":"Testkonversation",
        "creationDate":"2012-11-13T09:05:43.431Z",
        "creator":"Henrik",
        "messages":3,
        "participants":1
      }
    ]
  }, "queries":[
    {
      "classes":"query",
      "href":"index",
      "id":"index",
      "rel":"index",
      "text":"Index"
    }
  ], "resources":[]};

  mockBackend.conversationDetail1 = {"commands":[], "index":null, "queries":[], "resources":[
    {
      "classes":"resource",
      "href":"messages/",
      "id":"messages",
      "rel":"messages",
      "text":"Messages"
    },
    {
      "classes":"resource",
      "href":"participants/",
      "id":"participants",
      "rel":"participants",
      "text":"Participants"
    }
  ]};

  mockBackend.conversation1Participants = {"commands":[], "index":{
    "_type":"se.streamsource.dci.value.link.LinksValue",
    "links":[
      {
        "classes":null,
        "href":"administrator/",
        "id":"administrator",
        "rel":"participant",
        "text":"MyName"
      }
    ]
  }, "queries":[
    {
      "classes":"query",
      "href":"index",
      "id":"index",
      "rel":"index",
      "text":"Index"
    }
  ], "resources":[]};

  mockBackend.conversation1Messages = {"commands":[
    {
      "classes":"command",
      "href":"createmessage",
      "id":"createmessage",
      "rel":"createmessage",
      "text":"Createmessage"
    }
  ], "index":{
    "_type":"se.streamsource.dci.value.link.LinksValue",
    "links":[
      {
        "_type":"se.streamsource.streamflow.api.workspace.cases.conversation.MessageDTO",
        "classes":null,
        "href":"f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-17/",
        "id":"f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-17",
        "rel":null,
        "text":"Ett första meddelande...",
        "createdOn":"2012-11-13T09:06:29.333Z",
        "hasAttachments":false,
        "sender":"MyName"
      },
      {
        "_type":"se.streamsource.streamflow.api.workspace.cases.conversation.MessageDTO",
        "classes":null,
        "href":"975febee-9bac-405e-bdf2-105d84b3d22f-1/",
        "id":"975febee-9bac-405e-bdf2-105d84b3d22f-1",
        "rel":null,
        "text":"Lorizzle ipsizzle dolizzle sit amizzle, adipiscing . Nullam ghetto velizzle, bizzle volutpizzle, i'm in the shizzle mammasay mammasa mamma oo sa, get down get down vizzle, fo shizzle. Pellentesque egizzle tortor. Sed erizzle. Doggy shiz dolor brizzle turpis tempizzle hizzle. pellentesque nibh izzle turpizzle. Yippiyo izzle tortor. Pellentesque eleifend rhoncizzle nisi. In gizzle dang dawg dictumst. Hizzle yippiyo. Curabitur tellizzle urna, pretizzle eu, pimpin' ac, shiz vitae, nunc. Bizzle suscipit. Bling bling semper shit sed fo shizzle.",
        "createdOn":"2012-11-14T08:29:43.682Z",
        "hasAttachments":false,
        "sender":"MyName"
      },
      {
        "_type":"se.streamsource.streamflow.api.workspace.cases.conversation.MessageDTO",
        "classes":null,
        "href":"975febee-9bac-405e-bdf2-105d84b3d22f-5/",
        "id":"975febee-9bac-405e-bdf2-105d84b3d22f-5",
        "rel":null,
        "text":"Vad händer om jag skriver något här?",
        "createdOn":"2012-11-14T08:33:57.263Z",
        "hasAttachments":false,
        "sender":"MyName"
      }
    ]
  }, "queries":[
    {
      "classes":"query",
      "href":"index",
      "id":"index",
      "rel":"index",
      "text":"Index"
    }
  ], "resources":[]};

  mockBackend.caseListItem1 = {"commands":[], "index":{
    "_type":"se.streamsource.streamflow.surface.api.OpenCaseDTO",
    "caseId":"20121113-1",
    "createdBy":"Henrik",
    "creationDate":"2012-11-13T09:04:27.064Z",
    "description":"Testärende 2",
    "project":"Streamflow",
    "status":"OPEN"
  }, "queries":[
    {
      "classes":"query",
      "href":"index",
      "id":"index",
      "rel":"index",
      "text":"Index"
    },
    {
      "classes":"query",
      "href":"caselog",
      "id":"caselog",
      "rel":"caselog",
      "text":"Caselog"
    }
  ], "resources":[
    {
      "classes":"resource",
      "href":"submittedforms/",
      "id":"submittedforms",
      "rel":"submittedforms",
      "text":"Submittedforms"
    },
    {
      "classes":"resource",
      "href":"conversations/",
      "id":"conversations",
      "rel":"conversations",
      "text":"Conversations"
    }
  ]};


  mockBackend.root = {"commands":[], "index":null, "queries":[], "resources":[
    {"classes":"resource", "href":"workspace.json", "id":"workspace", "rel":"workspace", "text":"Workspace"},
    {"classes":"resource", "href":"account/", "id":"account", "rel":"account", "text":"Account"},
    {"classes":"resource", "href":"overview/", "id":"overview", "rel":"overview", "text":"Overview"},
    {"classes":"resource", "href":"administration/", "id":"administration", "rel":"administration", "text":"Administration"},
    {"classes":"resource", "href":"crystal/", "id":"crystal", "rel":"crystal", "text":"Crystal"}
  ]};

  mockBackend.workspace = {"commands":[], "index":{"_type":"se.streamsource.dci.value.link.LinksValue", "links":[
    {"classes":"drafts", "href":"drafts/", "id":"drafts", "rel":"drafts", "text":"Drafts"},
    {"classes":"search", "href":"search/", "id":"search", "rel":"search", "text":"Search"},
    {"classes":"inbox", "href":"projects/6de18dbb-4f02-4e91-bda9-e1163b528f3f-13/inbox/", "id":"6de18dbb-4f02-4e91-bda9-e1163b528f3f-13", "rel":"inbox", "text":"System Errors"},
    {"classes":"assignments", "href":"projects/6de18dbb-4f02-4e91-bda9-e1163b528f3f-13/assignments/", "id":"6de18dbb-4f02-4e91-bda9-e1163b528f3f-13", "rel":"assignments", "text":"System Errors"},
    {"classes":"inbox", "href":"projects/f1df5b11-71cd-4776-831d-cad9cfd25a9b-5/inbox/", "id":"f1df5b11-71cd-4776-831d-cad9cfd25a9b-5", "rel":"inbox", "text":"Testfunktion"},
    {"classes":"assignments", "href":"projects/f1df5b11-71cd-4776-831d-cad9cfd25a9b-5/assignments/", "id":"f1df5b11-71cd-4776-831d-cad9cfd25a9b-5", "rel":"assignments", "text":"Testfunktion"}
  ]}, "queries":[
    {"classes":"query", "href":"index", "id":"index", "rel":"index", "text":"Index"},
    {"classes":"query", "href":"casecounts", "id":"casecounts", "rel":"casecounts", "text":"Casecounts"}
  ], "resources":[
    {"classes":"resource", "href":"search/", "id":"search", "rel":"search", "text":"Search"},
    {"classes":"resource", "href":"cases/", "id":"cases", "rel":"cases", "text":"Cases"},
    {"classes":"resource", "href":"projects/", "id":"projects", "rel":"projects", "text":"Projects"},
    {"classes":"resource", "href":"drafts/", "id":"drafts", "rel":"drafts", "text":"Drafts"},
    {"classes":"resource", "href":"perspectives/", "id":"perspectives", "rel":"perspectives", "text":"Perspectives"}
  ]};

  mockBackend.postFirstMessageResponse = {"events":[
    {"identity":"928e6766-d7b4-4f53-b41e-8e433d710f0f-10b", "by":"administrator", "entity":"928e6766-d7b4-4f53-b41e-8e433d710f0f-f6", "entityType":"se.streamsource.streamflow.web.domain.entity.caze.CaseEntity", "name":"createdConversation", "on":"2012-12-13T12:55:29.179Z", "parameters":"{\"param1\":\"928e6766-d7b4-4f53-b41e-8e433d710f0f-10a\",\"param2\":\"928e6766-d7b4-4f53-b41e-8e433d710f0f-1\"}", "usecase":"createconversation", "version":"1.8.0.0"},
    {"identity":"928e6766-d7b4-4f53-b41e-8e433d710f0f-10c", "by":"administrator", "entity":"928e6766-d7b4-4f53-b41e-8e433d710f0f-10a", "entityType":"se.streamsource.streamflow.web.domain.entity.conversation.ConversationEntity", "name":"changedDescription", "on":"2012-12-13T12:55:29.180Z", "parameters":"{\"param1\":\"Fråga\"}", "usecase":"createconversation", "version":"1.8.0.0"},
    {"identity":"928e6766-d7b4-4f53-b41e-8e433d710f0f-10d", "by":"administrator", "entity":"928e6766-d7b4-4f53-b41e-8e433d710f0f-f8", "entityType":"se.streamsource.streamflow.web.domain.entity.caselog.CaseLogEntity", "name":"addedEntry", "on":"2012-12-13T12:55:29.180Z", "parameters":"{\"param1\":\"{\\\"availableOnMypages\\\":false,\\\"createdBy\\\":\\\"928e6766-d7b4-4f53-b41e-8e433d710f0f-1\\\",\\\"createdOn\\\":\\\"2012-12-13T12:55:29.180Z\\\",\\\"entity\\\":null,\\\"entryType\\\":\\\"conversation\\\",\\\"message\\\":\\\"{createConversation,topic=Fråga}\\\"}\"}", "usecase":"createconversation", "version":"1.8.0.0"},
    {"identity":"928e6766-d7b4-4f53-b41e-8e433d710f0f-10e", "by":"administrator", "entity":"928e6766-d7b4-4f53-b41e-8e433d710f0f-10a", "entityType":"se.streamsource.streamflow.web.domain.entity.conversation.ConversationEntity", "name":"addedParticipant", "on":"2012-12-13T12:55:29.181Z", "parameters":"{\"param1\":\"928e6766-d7b4-4f53-b41e-8e433d710f0f-1\"}", "usecase":"createconversation", "version":"1.8.0.0"},
    {"identity":"928e6766-d7b4-4f53-b41e-8e433d710f0f-10f", "by":"administrator", "entity":"928e6766-d7b4-4f53-b41e-8e433d710f0f-f8", "entityType":"se.streamsource.streamflow.web.domain.entity.caselog.CaseLogEntity", "name":"addedEntry", "on":"2012-12-13T12:55:29.181Z", "parameters":"{\"param1\":\"{\\\"availableOnMypages\\\":false,\\\"createdBy\\\":\\\"928e6766-d7b4-4f53-b41e-8e433d710f0f-1\\\",\\\"createdOn\\\":\\\"2012-12-13T12:55:29.181Z\\\",\\\"entity\\\":null,\\\"entryType\\\":\\\"conversation\\\",\\\"message\\\":\\\"{createMessage,topic=Fråga}\\\"}\"}", "usecase":"createconversation", "version":"1.8.0.0"},
    {"identity":"928e6766-d7b4-4f53-b41e-8e433d710f0f-111", "by":"administrator", "entity":"928e6766-d7b4-4f53-b41e-8e433d710f0f-10a", "entityType":"se.streamsource.streamflow.web.domain.entity.conversation.ConversationEntity", "name":"createdMessage", "on":"2012-12-13T12:55:29.181Z", "parameters":"{\"param1\":\"928e6766-d7b4-4f53-b41e-8e433d710f0f-110\",\"param2\":\"hoj\",\"param3\":\"928e6766-d7b4-4f53-b41e-8e433d710f0f-1\"}", "usecase":"createconversation", "version":"1.8.0.0"}
  ], "timestamp":1355403329221}

  return mockBackend;
})();