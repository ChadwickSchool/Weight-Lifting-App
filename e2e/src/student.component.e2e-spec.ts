import { browser, by, element, Ptor, protractor } from 'protractor';

describe('Student Component e2e tests', () => {
  const GOOGLE_USERNAME = '<LOAD_CONFIG_FILE>';
  const GOOGLE_PASSWORD = '<LOAD_CONFIG_FILE>';
  const ec = protractor.ExpectedConditions;
  const BROWSER_WAIT = 3000;
  beforeAll(() => {
    browser.get('/' + 'today-workout-student');
    this.emailInput = element(by.id('Email'));
    this.passwordInput = element(by.id('Passwd'));
    this.nextButton = element(by.id('next'));
    this.signInButton = element(by.id('login'));

    this.approveAccess = element(by.id('submit_approve_access'));

    this.loginToGoogle = function() {
      const self = this;

      /* Entering non angular site, it instructs webdriver to switch
       to synchronous mode. At this point I assume we are on google
       login page */

      browser.waitForAngularEnabled(false);
      this.emailInput.sendKeys(GOOGLE_USERNAME);
      this.nextButton.click();

      this.passwordInput.isPresent().then(() => {
        browser
          .wait(ec.visibilityOf(self.passwordInput), BROWSER_WAIT)
          .then(() => {
            self.passwordInput.sendKeys(GOOGLE_PASSWORD);
            self.signInButton.click();
            browser
              .wait(ec.elementToBeClickable(self.approveAccess), BROWSER_WAIT)
              .then(() => {
                self.approveAccess.click();
                /* Now we are being redirected to our app, switch back to
             async mode (page with angular) */
                browser.waitForAngularEnabled(true);
              });
          });
      });
    };

    this.signInButton.click();
    this.loginToGoogle();
  });

  it('should find Student Exercise Table', () => {
    expect(document).toContain(element(by.id('student-exercise-table')));
  });
});
