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

    ['?', 'escape', 'g g', 'tab', 'shift+tab', 'left', 'right', '+', '*++',
     'up down left right a b a b enter', 'ctrl+shift+down+space a'].map(add);

};

TestController.prototype.setMessage = function (message) {
    this.message = message;
}
