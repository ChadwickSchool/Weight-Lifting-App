import { ADMIN_USERNAME, ADMIN_PASSWORD, STUDENT_USERNAME, STUDENT_PASSWORD } from './google-login-info';
import { protractor } from 'protractor/built/ptor';
import { browser, element, by } from 'protractor';
import { setServers } from 'dns';

fdescribe('Create Workout e2e test', () => {
  const EC = protractor.ExpectedConditions;
  const GOOGLE_USERNAME = ADMIN_USERNAME;
  const GOOGLE_PASSWORD = ADMIN_PASSWORD;
  const GOOGLE_STUDENT_USERNAME = STUDENT_USERNAME;
  const GOOGLE_STUDENT_PASSWORD = STUDENT_PASSWORD;
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
    browser.get('/' + 'today-workout-admin');
    this.emailInput = element(by.id('identifierId'));
    this.passwordInput = element(by.name('password'));
    this.emailNextButton = element(by.id('identifierNext'));
    this.passwordNextButton = element(by.id('passwordNext'));
    this.signInButton = element(by.id('login'));
    this.approveAccess = element(by.id('submit_approve_access'));

    this.loginToGoogle = function(username: string, password: string) {
      const self = this;

      /* Entering non angular site, it instructs webdriver to switch
       to synchronous mode. At this point I assume we are on google
       login page */

      browser.waitForAngularEnabled(false);
      browser.wait(EC.visibilityOf(self.emailInput), BROWSER_WAIT).then(() => {
        this.emailInput.sendKeys(username);
        this.emailNextButton.click();
        browser
          .wait(EC.visibilityOf(self.passwordInput), BROWSER_WAIT)
          .then(() => {
            self.passwordInput.sendKeys(password);
            self.passwordInput.sendKeys(protractor.Key.ENTER);
            browser.waitForAngularEnabled(true);
          });
      });
    };

    this.signInButton.click();
    selectWindow(1);
    this.loginToGoogle(GOOGLE_USERNAME, GOOGLE_PASSWORD);
    selectWindow(0);
    browser.wait(
      EC.visibilityOf(element(by.id('create-workout'))),
      BROWSER_WAIT
    );
    element(by.id('create-workout')).click();
  });

  it('should create a workout and display it for the student', () => {
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
    // add exercise one
    browser.waitForAngularEnabled(false);
    browser.wait(
      EC.visibilityOf(element(by.id(' '))),
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
    saveWorkoutButton.click();
    // log out of admin
    logoutButton.click();
    // log in to student
    this.signInButton.click();
    selectWindow(1);
    this.loginToGoogle(GOOGLE_STUDENT_USERNAME, GOOGLE_STUDENT_PASSWORD);
    selectWindow(0);
    browser.wait(
      EC.visibilityOf(element(by.id('today-workout'))),
      BROWSER_WAIT
    );
    element(by.id('workout-label')).click();
  });
});
