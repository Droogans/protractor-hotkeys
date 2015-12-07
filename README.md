```js
it('should trigger the hotkeys menu', function () {
    hotkeys.trigger('?');
    expect(somePage.hotkeyMenu.isPresent()).to.eventually.be.true;
});

it('should close the hotkeys menu', function () {
    hotkeys.trigger('esc');
    expect(somePage.hotkeyMenu.isPresent()).to.eventually.be.false;
});

it('should send the user to the home page', function () {
    // will press 'g', then release, then press 'h', and release
    hotkeys.trigger('g, h');
    expect(browser.getCurrentUrl()).to.eventually.contain('github.com');
});

it('should not submit the form, but instead make a new line', function () {
    // will hold down 'shift', then will press 'enter'
    hotkeys.trigger('shift + enter');
    expect(browser.getCurrentUrl()).to.eventually.not.contain('confirm-submission');
});
```

You need to click away from any active form elements (or into a form element) before calling `hotkeys.trigger`.
