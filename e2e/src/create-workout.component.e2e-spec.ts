import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  STUDENT_USERNAME,
  STUDENT_PASSWORD
} from './google-login-info';
import { protractor } from 'protractor/built/ptor';
import { browser, element, by } from 'protractor';
import { setServers } from 'dns';
import TestUtils from 'src/app/shared/utils/test-utils';
import Utils from 'src/app/shared/utils/utils';

describe('Create Workout e2e test', () => {
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

  const checkStudentView = () => {
    const loginButton = element(by.id('login'));
    const groupSelect = element(by.id('group-select'));
    const viewWorkout = element(by.id('workout-button'));
    const dropdown = element(by.id('exercise-select'));
    browser.waitForAngularEnabled(true);
    browser.wait(
      EC.visibilityOf(loginButton),
      BROWSER_WAIT,
      'timed out waiting for login button'
    );
    browser.waitForAngularEnabled(false);
    loginButton.click();
    selectWindow(1);
    this.loginToGoogle(GOOGLE_STUDENT_USERNAME, GOOGLE_STUDENT_PASSWORD);
    selectWindow(0);
    // browser.waitForAngularEnabled(true);
    browser.wait(
      EC.visibilityOf(element(by.id('home'))),
      BROWSER_WAIT,
      'timed out waiting for home button'
    );
    element(by.id('home')).click();
    browser.sleep(3000); // TODO don't use sleep
    groupSelect.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    viewWorkout.click();
    browser.wait(
      EC.elementToBeClickable(element(by.id('rec-exercises-expansion'))),
      3000
    );
    browser.waitForAngularEnabled(false);
    browser.sleep(2000);
    dropdown.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    element(by.id('rec-exercises-expansion')).click();

    browser.wait(EC.visibilityOf(element(by.id('recommended-exercises-table'))));
    // browser.wait(
    //   EC.textToBePresentInElementValue(element(by.id('recommended-exercises-table')), 'hooga wooga')
    // );
    browser.sleep(2000); // TODO Get above code to work
    element(by.id('recommended-exercises-table'))
      .getText()
      .then(text => {
        expect(text).toContain('hooga wooga');
        browser.waitForAngularEnabled(false);
      });
  };

  this.loginToGoogle = function(username: string, password: string) {
    this.emailInput = element(by.id('identifierId'));
    this.passwordInput = element(by.name('password'));
    this.emailNextButton = element(by.id('identifierNext'));
    this.passwordNextButton = element(by.id('passwordNext'));
    const self = this;

    /* Entering non angular site, it instructs webdriver to switch
     to synchronous mode. At this point I assume we are on google
     login page */

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
  beforeAll(() => {
    browser.get('/');

    this.signInButton = element(by.id('login'));
    this.approveAccess = element(by.id('submit_approve_access'));

    browser.waitForAngularEnabled(false);
    this.signInButton.click();
    selectWindow(1);
    this.loginToGoogle(GOOGLE_USERNAME, GOOGLE_PASSWORD);
    selectWindow(0);
    browser.wait(EC.visibilityOf(element(by.id('logout'))), BROWSER_WAIT);
    element(by.id('home')).click();
  });

  it('should create a workout and display it for the student', async () => {
    const groupSelect = element(by.id('group-select'));
    const dateSelect = element(by.id('date-input'));
    const createWorkoutButton = element(by.id('next-btn'));
    const addButton = element(by.id('add-exercise-button'));
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
    browser.sleep(2000); // TODO: Fix to not use browser.sleep
    groupSelect.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    dateSelect.click();
    dateSelect.sendKeys(new Date().toDateString());
    createWorkoutButton.click();
    browser.wait(
      EC.visibilityOf(element(by.id('add-exercise-button'))),
      3000,
      'timed out waiting for add-exercise-button'
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
      EC.visibilityOf(element(by.id('add-exercise-button'))),
      7000,
      'timed out waiting for add-exercise-button 2x'
    );
    browser.wait(
      EC.elementToBeClickable(addButton),
      BROWSER_WAIT,
      'timed out waiting for add button to be clickable'
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
      EC.elementToBeClickable(saveWorkoutButton),
      BROWSER_WAIT,
      'timed out waiting for workout-button'
    );
    saveWorkoutButton.click();
    browser.sleep(1000);
    // log out of admin
    logoutButton.click();
    // log in to student
    await browser.restart();
    browser.get('/');
    checkStudentView();
  });
});
