angular.module('HotkeysDemo', ['cfp.hotkeys'])
    .controller('TestController', TestController)
    .config(ConfigSetup);

function ConfigSetup (hotkeysProvider) {
    hotkeysProvider.includeCheatSheet = false;
}

function TestController (hotkeys) {
    var self = this;
    this.setMessage('No shortcut pressed yet.');

    var add = function (command) {
        hotkeys.add(command, function (event, hotkey) {
            event.preventDefault();
            self.setMessage(hotkey.format() + ' key pressed');
        });
    };

    // I can only test the most common, platform independent shortcuts.
    [
        'i', 'I',
        'g g', 'G G',
        '?', 'escape',
        'left', 'right',
        'tab', 'shift+tab',
        'f1', 'f10',
        'ctrl+up', 'ctrl+down',
        'alt+up', 'alt+down',
        'pageup', 'pagedown',
        'home', 'end',
        'backspace', 'del',
        'capslock', 'space',
        'up up down down left right left right b a enter',
        'ctrl+shift+down+space a',
        'ctrl+x ctrl+s ctrl+x ctrl+c',
    ].map(add);

}

TestController.prototype.setMessage = function (message) {
    this.message = message;
};
