var _ = require('lodash');

var Key = protractor.Key;


var hotkeyMap = {
     '*': Key.MULTIPLY,
     '+': Key.ADD,
     '-': Key.SUBTRACT,
     '.': Key.DECIMAL,
     '/': Key.DIVIDE,
     ';': Key.SEMICOLON,
     '=': Key.EQUALS,
     0: Key.NUMPAD0,
     1: Key.NUMPAD1,
     2: Key.NUMPAD2,
     3: Key.NUMPAD3,
     4: Key.NUMPAD4,
     5: Key.NUMPAD5,
     6: Key.NUMPAD6,
     7: Key.NUMPAD7,
     8: Key.NUMPAD8,
     9: Key.NUMPAD9,
     alt: Key.ALT,
     backspace: Key.BACK_SPACE,
     cancel: Key.CANCEL,
     clear: Key.CLEAR,
     command: Key.COMMAND,
     control: Key.CONTROL,
     delete: Key.DELETE,
     down: Key.ARROW_DOWN,
     end: Key.END,
     enter: Key.ENTER,
     escape: Key.ESCAPE,
     f10: Key.F10,
     f11: Key.F11,
     f12: Key.F12,
     f1: Key.F1,
     f2: Key.F2,
     f3: Key.F3,
     f4: Key.F4,
     f5: Key.F5,
     f6: Key.F6,
     f7: Key.F7,
     f8: Key.F8,
     f9: Key.F9,
     help: Key.HELP,
     home: Key.HOME,
     insert: Key.INSERT,
     left: Key.ARROW_LEFT,
     mod: Key.META,
     null: Key.NULL,
     pageDown: Key.PAGE_DOWN,
     pageUp: Key.PAGE_UP,
     pause: Key.PAUSE,
     return: Key.RETURN,
     right: Key.ARROW_RIGHT,
     shift: Key.SHIFT,
     space: Key.SPACE,
     tab: Key.TAB,
     up: Key.ARROW_UP,
};

var hotkeyAliases = {
    caps: hotkeyMap.capslock,
    cmd: hotkeyMap.mod,
    command: hotkeyMap.mod,
    ctrl: hotkeyMap.control,
    del: hotkeyMap.delete
    esc: hotkeyMap.escape,
    super: hotkeyMap.mod
    windowsKey: hotkeyMap.mod,
};

exports.HOTKEYS = _.extend(hotkeyMap, hotkeyAliases);

var codify = function (list) {
    return list.map(function (member) {
        member.trim();
        return exports.HOTKEYS[member];
    });
};

exports.trigger = function (command) {
    command = command.toLowerCase();

    // 'a b ctrl+shift+c' -> ['a', 'b', 'ctrl+shift+c']
    commands = codify(command.split(' '));
    // ['a', 'b', 'ctrl+shift+c'] -> ['a', 'b', ['ctrl', 'shift', 'c']]
    commands = commands.map(function (keypressCode) {
        return codify(keypressCode.split('+'));
    });

    commands.forEach(function (command) {
        if (_.isArray(command)) {
            var sequence = browser.actions();
            command.map(sequence.keyDown);
            command.map(sequence.keyUp);
            sequence.perform();
        } else {
            browser.actions().keyDown(command).keyUp(command).perform();
        }
    });

    // return this same function for chaining
    return { trigger: exports.trigger };
};
