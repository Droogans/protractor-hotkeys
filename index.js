var _ = require('lodash');
var protractor = require('protractor');

var Key = protractor.Key;

var hotkeyMap;

exports.hotkeyMap = hotkeyMap = {
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
     capslock: Key.CAPS_LOCK,
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

exports.hotkeyAliases = {
    caps: hotkeyMap.capslock,
    cmd: hotkeyMap.mod,
    command: hotkeyMap.mod,
    ctrl: hotkeyMap.control,
    del: hotkeyMap.delete,
    esc: hotkeyMap.escape,
    super: hotkeyMap.mod,
    windowsKey: hotkeyMap.mod,
};

exports.HOTKEYS = _.extend(hotkeyMap, exports.hotkeyAliases);

exports.codify = function (list) {
    return list.map(function (member) {
        member.trim();
        return exports.HOTKEYS[member] || member;
    });
};

exports.trigger = function (command, options) {
    if (options === undefined) {
        options = {};
    }

    // 'a b ctrl+shift+c' -> ['a', 'b', 'ctrl+shift+c']
    var commands = exports.codify(command.split(' '));
    // ['a', 'b', 'ctrl+shift+c'] -> [['a'], ['b'], [Key.CONTROL, Key.SHIFT, 'c']]
    commands = commands.map(function (keypressCode) {
        return exports.codify(keypressCode.split('+'));
    });

    var target = options.targetElement || $('body');
    commands.forEach(function (command) {
        target.sendKeys.apply(target, command);
    });

    // return this same function for chaining
    return { trigger: exports.trigger };
};
