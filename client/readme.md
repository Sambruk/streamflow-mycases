## Learn AngularJS

Check the tutorial at http://angularjs.org

Other links:
* http://roytruelove.blogspot.se/2012/09/angularjs-dependency-injection-modules.html
* http://www.youtube.com/watch?v=GJey_oygU3Y
* http://vxtindia.com/blog/8-tips-for-angular-js-beginners/
* http://www.cheatography.com/proloser/cheat-sheets/angularjs/

Help:
* http://webchat.freenode.net/?channels=angularjs&uio=d4

## Developer Installation

### Git

Install Git
   sudo apt-get install git

### Clone the project

Clone the project:

    git clone git@github.com:jayway/streamflow.git 

### Node.js and npm

Install node js version 0.8.x

On ubuntu (12.04):

Notice, sudo apt-get install installs the wrong version.

    sudo apt-get update && sudo apt-get install curl build-essential openssl libssl-dev git python g++
    export node_version_to_install='v0.8.9'
    curl https://raw.github.com/bevry/community/master/install-node/install-node.sh | sh
   
    sudo apt-get install npm

See https://github.com/bevry/community/wiki/Installing-Node

Mac 

    brew install node
    curl http://npmjs.org/install.sh | sh

windows 7

    download and install node-v0.8.14-x64.msi
    add nodejs folder to environment variables


Make sure you don't install 0.9.x or 0.7 version !
npm is the node package manager.

### PhantomJS

PhantomJS is used for running tests in a headless browser, not required but very
nice.

Download the binaries from here: http://phantomjs.org/download.html

    http://phantomjs.org/download.html

Ubuntu:

    tar jxvf phantomjs-1.7.0-linux-i686.tar.bz2

Make sure you have the bin/phantomjs in your PATH environment

Windows 7
    download and install phantomjs-1.7.0-windows.zip
    add phantomjs folder to environment variables


### testacular

Used to runs tests

    sudo npm install -g testacular

Windows 7
    In order to run testacular "start --single-run" with the default script in the streamflow directory you will have to register the browser with the Windows Environment variables.
    Example:
      CHROME_BIN = C:\Program Files (x86)\Google\Chrome\Application\chrome.exe
      PHANTOMJS_BIN = C:\Program Files\Phantomjs\phantomjs-1.7.0-windows\phantomjs.exe

    (Remember to restart your cmd prompt to reload the variables from the system.)

## Run

### Run the application

Use the node web server

     ./web-server.js

If you are using the real streamflow backend (see config below) you need to disable the web security since
we are accessing the backend at a different port:

Mac OSX:
  alias chrome="/Applications/Google\\ \\Chrome.app/Contents/MacOS/Google\\ \\Chrome"

  alias chromex="chrome --disable-web-security"

## Configuration

The Backend end point might need to be configured, see app/modules/common/services/http-services.js (see comment in source file).
You can either use static json files in the app/mock folder or use the real streamflow server at /test_server folder

### Running Tests

Example:
    testacular start --single-run

Notice you can also run it from yeoman, or configure it so that it
will run the test automatically when files are being changed.

### Debugging

Chrome AngularJS addon

* https://chrome.google.com/webstore/detail/angularjs-batarang/ighdmehidhipcmcojjgiloacoafjmpfk/related

Notice, debugging can also be done from WebStorm (see testacular video)

Debugging test code can also be done by simply log statements:
For PhantomJS use `dump()`

### Build Configuration

The build and development configuration is specified in the Gruntfile.js
(it's like a make or maven file but for JavaScript).

### Test Server

In the test_server folder is the a streamsource server, see the test_server/readme.md file.

## The Swing Client

* Download the Java Web Start Application , http://test.sf.streamsource.se/client/

### To create a new case

* select My Cases to the left drop down tree
* click new case
* Enter a description
* set case type
* click on the bottom Contacts tab
* Enter the contact ID

## Optional Dependencies

###  Yeoman

Yeoman is used to build the site.
It can also be used for running a webserver and sync. a webbrowser, or
running tests.

   curl -L get.yeoman.io | bash

Yeoman needs:
* Ruby
* NodeJs
* Compass

It will check the environment that everthing is installed.

### Running in development model

Run
   yeoman server

This will open a browser window that will reload when files are being changed.


### Build a production site

  yeoman build

This will compress the javascript files (and more things).

### Unit Test
  ** Test from command line

yeoman test

  ** Automatic test with watch
  ** E2E tests

### E2E Tests

Make sure you have a web server running at port 8000
(web-server.js PORT and the testacular-e2e.conf.js must match)

   ./web-server.js

From command line:

  yeoman e2e
  # alternative, testacular start testacular-e2e.conf.js --single-run

From browser:

  Navigate to: http://localhost:8000/test/e2e/runner.html

Check the testacular.[e2e]-conf.js files which browser are used.

### Help

yeoman help

### To Run

  yeoman server

## Mockup server
http://demo.sf.streamsource.se/mycases/index.html

### Testing REST

https://chrome.google.com/webstore/detail/advanced-rest-client

#### Simulating 403

Use the node test server (web-server.js) and enter the URL:
http://localhost:8000/simulate403

# TODO and Issues

See github issues: https://github.com/jayway/streamflow/issues
