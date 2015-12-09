var hotkey = require('../index');

var page = {
    get text() { return element(by.binding('test.message')).getText(); }
};

describe('hotkeys', function () {

    before(function () {
        browser.get('http://localhost:9000');
    });

    it('should respond to lowercase letters', function () {
        hotkey.trigger('i');
        expect(page.text).to.eventually.equal('i key pressed');
    });

    it('should respond to uppercase letters', function () {
        hotkey.trigger('I');
        expect(page.text).to.eventually.equal('I key pressed');
    });

    it('should update the text with lowercase combo keypresses', function () {
        hotkey.trigger('g g');
        expect(page.text).to.eventually.equal('g,g key pressed');
    });

    it('should update the text with uppercase combo keypresses', function () {
        hotkey.trigger('G G');
        expect(page.text).to.eventually.equal('G,G key pressed');
    });

    it('should respond to basic keys', function () {
        hotkey.trigger('?');
        expect(page.text).to.eventually.equal('? key pressed');
    });

    it('should update the text', function () {
        hotkey.trigger('escape');
        expect(page.text).to.eventually.equal('escape key pressed');
    });

    it('should update the text with indirect key presses', function () {
        hotkey.trigger('shift+/');
        expect(page.text).to.eventually.equal('? key pressed');
    });

    it('should update the text with an alias', function () {
        hotkey.trigger('esc');
        expect(page.text).to.eventually.equal('escape key pressed');
    });

    it('should update the text when pressing arrow keys', function () {
        hotkey.trigger('left');
        expect(page.text).to.eventually.equal('← key pressed');
        hotkey.trigger('right');
        expect(page.text).to.eventually.equal('→ key pressed');
    });

    it('should update the text with tabbing', function () {
        hotkey.trigger('tab');
        expect(page.text).to.eventually.equal('tab key pressed');
    });

    it('should update the text with a shift + tab chord', function () {
        hotkey.trigger('shift+tab');
        expect(page.text).to.eventually.equal('⇧ + tab key pressed');
    });

    it('should update the text with function keys', function () {
        hotkey.trigger('f1');
        expect(page.text).to.eventually.equal('f1 key pressed');
        hotkey.trigger('f10');
        expect(page.text).to.eventually.equal('f10 key pressed');
    });

    it('should update the text with shortcuts using the ctrl key', function () {
        hotkey.trigger('ctrl+up');
        expect(page.text).to.eventually.equal('ctrl + ↑ key pressed');
        hotkey.trigger('ctrl+down');
        expect(page.text).to.eventually.equal('ctrl + ↓ key pressed');

        hotkey.trigger('control+up');
        expect(page.text).to.eventually.equal('ctrl + ↑ key pressed');
        hotkey.trigger('control+down');
        expect(page.text).to.eventually.equal('ctrl + ↓ key pressed');
    });

    it('should support chaining long hotkey shortcuts', function () {
        hotkey
            .trigger('up down left right')
            .trigger('a b a b enter');
        expect(page.text).to.eventually.equal('↑,↓,←,→,a,b,a,b,enter key pressed');
    });

    it('should support complex hotkey shortcuts', function () {
        hotkey.trigger('ctrl+shift+down+space a');
        expect(page.text).to.eventually.equal('ctrl + ⇧ + ↓ + space,a key pressed');

        hotkey.trigger('control+shift+down+space a');
        expect(page.text).to.eventually.equal('ctrl + ⇧ + ↓ + space,a key pressed');
    });

    it('should support complex hotkey shortcuts in a different order', function () {
        hotkey.trigger('ctrl+shift+space+down a');
        expect(page.text).to.eventually.equal('ctrl + ⇧ + ↓ + space,a key pressed');

        hotkey.trigger('control+shift+space+down a');
        expect(page.text).to.eventually.equal('ctrl + ⇧ + ↓ + space,a key pressed');
    });

    it('should allow for a custom delimiter', function () {
        hotkey.trigger('{-!', { delimteter: '-' });
        expect(page.text).to.eventually.equal('{ + ! key pressed');
    });

});
