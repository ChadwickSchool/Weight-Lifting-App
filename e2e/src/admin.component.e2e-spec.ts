import { browser, by, element, protractor } from 'protractor';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from './google-login-info';

describe('Admin Component e2e test', () => {
  const EC = protractor.ExpectedConditions;
  const GOOGLE_USERNAME = ADMIN_USERNAME;
  const GOOGLE_PASSWORD = ADMIN_PASSWORD;
  const BROWSER_WAIT = 8000;

  /**
   * [selectWindow Focus the browser to the index window.
   * @param  index [Is the index of the window. E.g., 0=browser, 1=FBpopup]
   */
  const selectWindow = async (index: number) => {
    // wait for handles[index] to exist
    browser.wait(async () => {
      const handles = await browser.getAllWindowHandles();
      /**
       * Assume that handles.length >= 1 and index >=0.
       * So when calling selectWindow(index) return
       * true if handles contains that window.
       */
      if (handles.length > index) {
        return true;
      }
    }, 30000);
    // switch to the window
    const handlesPromise = await browser.getAllWindowHandles();
    return browser.switchTo().window(handlesPromise[index]);
  };
  beforeAll(() => {
    browser.get('/');
    this.emailInput = element(by.id('identifierId'));
    this.passwordInput = element(by.name('password'));
    this.emailNextButton = element(by.id('identifierNext'));
    this.passwordNextButton = element(by.id('passwordNext'));
    this.signInButton = element(by.id('login'));
    this.approveAccess = element(by.id('submit_approve_access'));

    this.loginToGoogle = function() {
      const self = this;

      /* Entering non angular site, it instructs webdriver to switch
       to synchronous mode. At this point I assume we are on google
       login page */

      browser.waitForAngularEnabled(false);
      browser.wait(EC.visibilityOf(self.emailInput), BROWSER_WAIT).then(() => {
        this.emailInput.sendKeys(GOOGLE_USERNAME);
        this.emailNextButton.click();
        browser
          .wait(EC.visibilityOf(self.passwordInput), BROWSER_WAIT)
          .then(() => {
            self.passwordInput.sendKeys(GOOGLE_PASSWORD);
            self.passwordInput.sendKeys(protractor.Key.ENTER);
            browser.waitForAngularEnabled(true);
          });
      });
    };

    this.signInButton.click();
    selectWindow(1);
    this.loginToGoogle();
    selectWindow(0);
    browser.wait(
      EC.visibilityOf(element(by.id('create-workout'))),
      BROWSER_WAIT
    );
    element(by.id('home')).click();
  });

  // afterAll(() => {
  //   element(by.id('logout')).click();
  // });

  // it('should find Add Exercise button', () => {
  //   expect(document).toContain(element(by.id('dialog')));
  // });

  // it('should set correct value of all attributes', () => {
  //   const name = element(by.id('name-input'));
  //   const sets = element(by.id('sets-input'));
  //   const reps = element(by.id('reps-input'));
  //   const weight = element(by.id('weight-input'));
  //   const comments = element(by.id('comments-input'));
  //   browser.waitForAngularEnabled(false);
  //   browser.wait(
  //     EC.visibilityOf(element(by.id('add-button'))),
  //     BROWSER_WAIT,
  //     'timed out waiting for add-button'
  //   );
  //   element(by.id('add-button')).click();
  //   browser.wait(
  //     EC.visibilityOf(element(by.id('recommended-exercises-form'))),
  //     3000
  //   );
  //   name.click();
  //   name.sendKeys('test');
  //   sets.click();
  //   sets.sendKeys('50');
  //   reps.click();
  //   reps.sendKeys('20');
  //   weight.click();
  //   weight.sendKeys('100');
  //   comments.click();
  //   comments.sendKeys('No comment');
  //   element(by.id('submit-button')).click();
  //   browser.wait(EC.visibilityOf(element(by.id('exerciseTable'))), 3000);
  //   expect(element(by.id('exerciseTable')).isDisplayed()).toBe(true);
  //   element(by.id('exerciseTable'))
  //     .getText()
  //     .then(text => {
  //       expect(text).toContain('test');
  //       expect(text).toContain('50');
  //       expect(text).toContain('20');
  //       expect(text).toContain('100');
  //     });
  // });

  // it('should return to home page after clicking "save workout"', () => {
  //   element(by.id('workout-button')).click();
  //   expect(element(by.id('home')).isDisplayed()).toBe(true);
  // });

  fit('should add multiple exercises to the table', () => {
    const groupSelect = element(by.id('group-select'));
    const dateSelect = element(by.id('mat-input-0'));
    const createWorkoutButton = element(by.id('next-btn'));
    const addButton = element(by.id('add-button'));
    const nameInput = element(by.id('name-input'));
    const setsInput = element(by.id('sets-input'));
    const repsInput = element(by.id('reps-input'));
    const weightRangeInput = element(by.id('weight-input'));
    const commentsInput = element(by.id('comments-input'));
    const restInput = element(by.id('rest-input'));
    const saveExerciseButton = element(by.id('submit-button'));
    const saveWorkoutButton = element(by.id('workout-button'));
    const logoutButton = element(by.id('logout'));
    // fill out group and date
    browser.waitForAngularEnabled(false);
    groupSelect.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    dateSelect.click();
    dateSelect.sendKeys('8/14/2019');
    createWorkoutButton.click();
    // add exercise one
    browser.wait(
      EC.visibilityOf(element(by.id('add-button'))),
      3000,
      'timed out waiting for add-button'
    );
    addButton.click();
    browser.wait(EC.visibilityOf(nameInput));
    nameInput.click();
    nameInput.sendKeys('ooga booga');
    setsInput.click();
    setsInput.sendKeys('5');
    repsInput.click();
    repsInput.sendKeys('10');
    weightRangeInput.click();
    weightRangeInput.sendKeys('50');
    commentsInput.click();
    commentsInput.sendKeys('hooga wooga');
    restInput.click();
    restInput.sendKeys('take a load off');
    saveExerciseButton.click();
    browser.wait(
      EC.visibilityOf(element(by.id('add-button'))),
      7000,
      'timed out waiting for add-button 2x'
    );
    // add exercise two
    addButton.click();
    browser.wait(EC.visibilityOf(nameInput));
    nameInput.click();
    nameInput.sendKeys('booga ooga');
    setsInput.click();
    setsInput.sendKeys('6');
    repsInput.click();
    repsInput.sendKeys('11');
    weightRangeInput.click();
    weightRangeInput.sendKeys('51');
    commentsInput.click();
    commentsInput.sendKeys('wooga hooga');
    restInput.click();
    restInput.sendKeys('take another load off');
    saveExerciseButton.click();
    browser.wait(
      EC.visibilityOf(saveWorkoutButton),
      BROWSER_WAIT,
      'timed out waiting for workout-button'
    );
    element(by.id('exerciseTable'))
      .getText()
      .then(text => {
        expect(text).toContain('ooga booga');
        expect(text).toContain('booga ooga');
      });
  });
});
