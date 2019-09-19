const origFn = browser.driver.controlFlow().execute;

browser.driver.controlFlow().execute = function() {
    const args = arguments;

    origFn.call(browser.driver.controlFlow(), function() {
        return protractor.promise.delayed(300);
    });

    return origFn.apply(browser.driver.controlFlow(), args);
};
