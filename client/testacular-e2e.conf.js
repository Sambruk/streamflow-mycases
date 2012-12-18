// Testacular configuration


// base path, that will be used to resolve files and exclude
basePath = '';


// list of files / patterns to load in the browser
files = [
    ANGULAR_SCENARIO,
    ANGULAR_SCENARIO_ADAPTER,
    'test/e2e/**/*.js'
];


autoWatch = true;

browsers = ['Chrome'];

singleRun = false;

proxies = {
    '/': 'http://localhost:8000/'
//   '/': 'http://localhost:3501/'
};

junitReporter = {
    outputFile: 'test_out/e2e.xml',
    suite: 'e2e'
};