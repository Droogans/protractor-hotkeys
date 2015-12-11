# protractor-hotkeys

An angular-hotkeys styled API for triggering keyboard shortcuts in Protractor tests.

> vanilla Protractor
```js
// send ctrl+a to the webpage
browser.actions().keyDown(protractor.Key.CONTROL).sendKeys('a').perform();
```

-----------

> protractor-hotkeys
```js
var hotkeys = require('protractor-hotkeys');
hotkeys.trigger('ctrl+a');
// testing the konami code Easter Egg on your site is easy
hotkeys
    .trigger('up up down down')
    .trigger('left right left right')
    .trigger('b a enter');
```

## Targeting hotkey commands at a specific element

By default, all keyboard command sequences will target the `<body>` tag, but you can pass in a `targetElement` if you need to send keyboard shortcuts to someplace else on the page.

```js
hotkeys.trigger('g g', { targetElement: $('.content-area') });
```

## Testing

This works on Firefox and Chrome on Mac. I only test the easiest, platform-independent shortcuts. Hopefully I have captured most of the testing surface with these.

 - single characters (`'i'`, `'I'`, `'?'`)
 - single characters pressed in succession (`'g g'`, `'G G'`)
 - directional arrows (`'left'`, `'right'`)
 - function keys (`'f1'`, `'f10'`)
 - control, shift, and alt keys as modifiers (`'ctrl+up'`, `'shift+tab'`, `'alt+down'`)
 - uncommon keys (`'capslock'`, `'delete'`, `'backspace'`, `'space'`, `'home'`, '`pageup`')
 - complex combinations of the above (Konami-code style stuff)

## On the `mod` key (aka "super", aka ⌘, aka ![WindowsKey](http://i.stack.imgur.com/hcAFr.png))

I make no promises about how this library will function using these keys. I did some local testing on a Mac, so the command key should work just as it does in angular-hotkeys (the `'mod'` string can be used, but it is mapped to Selenium's `META` key). In the future, it may be worth it to use this library as a unifying interface between Linux, Mac, and Windows keyboard layouts.

If you are able to decide *what* keyboard shortcuts your app can use, please consider not using this "super" key. If you'd like to read up on it, [this stackoverflow question](http://stackoverflow.com/questions/3329420/what-are-cross-browser-cross-os-safe-keyboard-shortcuts-usable-for-web-applica) has some good points. For the best experience, [copy Github](https://help.github.com/articles/using-keyboard-shortcuts/) and stick with *single character* and shift-modifier shortcuts.
