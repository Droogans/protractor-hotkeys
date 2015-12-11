var _ = require('lodash');
var Key = require('protractor').Key;

var codify = require('../index').codify;
var hotkeys = require('../index').hotkeyMap;
var hotkeyAliases = require('../index').hotkeyAliases;

describe('codify', function () {
    it('should codify space separated commands', function () {
        expect(codify(['a', 'b', 'ctrl+shift+c'])).to.eql(['a', 'b', 'ctrl+shift+c']);
    });

    it('should codify combo presses into another codified array', function () {
        expect(codify(['ctrl', 'shift', 'c'])).to.eql([Key.CONTROL, Key.SHIFT, 'c']);
    });
});

describe('aliases', function () {
    var aliases =  {
        caps: 'capslock',
        cmd: 'mod',
        command: 'mod',
        ctrl: 'control',
        del: 'delete',
        esc: 'escape',
        super: 'mod',
        windowsKey: 'mod',
    };

    var officialAliases = _.keys(hotkeyAliases);
    _.forEach(_.keys(aliases), function (alias) {
        it('should have an alias for ' + alias, function () {
            expect(officialAliases).to.contain(alias);
        });

        it('should have the same key value for ' + alias + ' in the original hotkey map', function () {
            var originalLookup = aliases[alias];
            var originalValue = hotkeys[originalLookup];
            expect(hotkeyAliases[alias]).to.equal(originalValue);
        });
    });

    it('should have the same number of aliases in the offical version', function () {
        expect(officialAliases.length).to.equal(_.keys(aliases).length);
    });
});
