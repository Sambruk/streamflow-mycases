## The StreamSource Server

### Install

Run the install.sh file. It will download a webserver (jetty runner) and the stream source web app.

### Install the database

Mac

Unpack the StreamflowServer.zip (found in this folder) to /Users/YOUR_NAME/Library/Application Support

Windows: 
???

### Run

Run the run.sh file. It will start the jetty webserver with the stream source web application.
Open browser at http://localhost:8090/streamflow


### Test


http://localhost:8090/streamflow/surface/customers/197606030001/
http://localhost:8090/streamflow/surface/customers/197606030001/open/cases.json
http://localhost:8090/streamflow/surface/customers/197606030001/open/f9d9a7f7-b8ef-4c56-99a8-3b9b5f2e7159-0/

This maps to:

http://demo.sf.streamsource.se/mycases/index.html

### Install the WebStart Client

This is optional
I think the webstart client can be downloaded from the web application ?


### Config the server

In case you get an exception when you start:
wget http://waybuild.gotdns.com/nexus/content/repositories/snapshots/se/streamsource/streamflow/streamflow-web/1.8.0-SNAPSHOT/streamflow-web-1.8.0-20121120.101803-1.war

* Open VisualVM
* Open MBeans floder in the jetty-runner process
*   