exports.config = {
    baseUrl: 'http://localhost:9000',

    specs: [
        './test/functional.js'
    ],

    framework: 'mocha',

    multiCapabilities: [{
        browserName: 'firefox',
    }, {
        browserName: 'chrome',
    }],

    allScriptsTimeout: 30000,

    params: {},

    onPrepare: function () {
        expect = require('chai').use(require('chai-as-promised')).expect;
    },

    mochaOpts: {
        enableTimeouts: false,
        reporter: 'spec',
        slow: 5000,
        ui: 'bdd'
    },

    seleniumAddress: 'http://localhost:4444/wd/hub'
};
