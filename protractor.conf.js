exports.config = {
    baseUrl: 'http://localhost:9000',

    specs: [
        './test/functional.js'
    ],

    framework: 'mocha',

    capabilities: {
        browserName: 'firefox',
    },

    allScriptsTimeout: 30000,

    params: {},

    onPrepare: function () {
        debugger;
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
