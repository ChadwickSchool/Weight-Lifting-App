import { browser, element, by } from 'protractor';
import { protractor } from 'protractor/built/ptor';

export default class E2EUtils {

  static selectWindow(browser, index) {
    // wait for handles[index] to exist
    browser.wait(function() {
      return browser.getAllWindowHandles().then(function(handles) {
        /**
         * Assume that handles.length >= 1 and index >=0.
         * So when calling selectWindow(index) return
         * true if handles contains that window.
         */
        if (handles.length > index) {
          return true;
        }
      });
    }, 30000);
    // here i know that the requested window exists
    // switch to the window
    return browser.getAllWindowHandles().then(function(handles) {
      return browser.switchTo().window(handles[index]);
    });
  };

  static loginToGoogle(browser) {
    const self = this;
    const BROWSER_WAIT = 8000;
    const emailInput = element(by.id('identifierId'));
    const passwordInput = element(by.name('password'));
    const emailNextButton = element(by.id('identifierNext'));
    const ec = protractor.ExpectedConditions;

    /* Entering non angular site, it instructs webdriver to switch
     to synchronous mode. At this point I assume we are on google
     login page */

    browser.waitForAngularEnabled(false);
    browser
      .wait(ec.visibilityOf(emailInput), BROWSER_WAIT)
      .then(() => {
        emailInput.sendKeys('test.angular.wla.student@gmail.com');
        emailNextButton.click();
        browser
          .wait(ec.visibilityOf(passwordInput), BROWSER_WAIT)
          .then(() => {
            passwordInput.sendKeys('godolphins');
            passwordInput.sendKeys(protractor.Key.ENTER);
            browser.waitForAngularEnabled(true);
          });
      });
  };
}
