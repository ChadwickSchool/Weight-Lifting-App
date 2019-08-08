import {
  ADMIN_USERNAME,
  ADMIN_PASSWORD,
  STUDENT_USERNAME,
  STUDENT_PASSWORD
} from './google-login-info';
import { protractor } from 'protractor/built/ptor';
import { browser, element, by, ElementFinder, WebElement } from 'protractor';
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

  this.loginToGoogle = function(username: string, password: string) {
    this.emailInput = element(by.id('identifierId'));
    this.passwordInput = element(by.name('password'));
    this.emailNextButton = element(by.id('identifierNext'));
    this.passwordNextButton = element(by.id('passwordNext'));
    const self = this;
    console.log('Logging into to google');

    /* Entering non angular site, it instructs webdriver to switch
     to synchronous mode. At this point I assume we are on google
     login page */
    browser.waitForAngularEnabled(false);
    const newEmailInput = element(by.id('identfierId'));
    browser.wait(EC.visibilityOf(this.emailInput), BROWSER_WAIT).then(() => {
      console.log('Saw email input');
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

  const checkStudentView = () => {
    const loginButton = element(by.id('login'));
    const groupSelect = element(by.id('group-select'));
    const viewWorkout = element(by.id('workout-button'));
    const exerciseSelect = element(by.id('exercise-name-select'));
    const repsInput = element(by.id('reps-input'));
    const weightInput = element(by.id('weight-input'));
    const commentInput = element(by.id('comment-input'));
    const nextSetButton = element(by.id('next-btn'));
    browser.waitForAngularEnabled(true);
    browser.wait(
      EC.visibilityOf(loginButton),
      BROWSER_WAIT,
      'timed out waiting for login button'
    );
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
    browser.sleep(3000);
    groupSelect.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    viewWorkout.click();
    exerciseSelect.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    repsInput.click();
    repsInput.sendKeys(10);
    weightInput.sendKeys(30);
    commentInput.sendKeys('SSIIIMMBBAAA');
    nextSetButton.click();
  };

  const checkStudentHistory = async () => {
    const loginButton = element(by.id('login'));
    const studentHistoryButton = element(by.id('history-label'));
    const studentTable = element(by.id('student-table'));
    const studentDropDown = element(by.id('student-select'));
    browser.waitForAngularEnabled(true);
    browser.wait(
      EC.visibilityOf(loginButton),
      BROWSER_WAIT,
      'timed out waiting for login button'
    );
    browser.waitForAngularEnabled(false);
    // log in as admin
    loginButton.click();
    selectWindow(1);
    this.loginToGoogle(GOOGLE_USERNAME, GOOGLE_PASSWORD);
    selectWindow(0);
    browser.wait(
      EC.elementToBeClickable(studentHistoryButton),
      BROWSER_WAIT,
      'timed out waiting for studentHistoryButton'
    );
    studentHistoryButton.click();
    browser.sleep(1000);
    browser.wait(
      EC.visibilityOf(element(by.id('student-table'))),
      BROWSER_WAIT,
      'timed out waiting for table'
    );

    const webElements = await element
      .all(by.className('mat-row'))
      .getWebElements();

    webElements.forEach(async (webElement: WebElement, index) => {
      const text = await webElement.getText();
      if (text.includes('Student Test')) {
        webElement.click();
      }
    });
    browser.sleep(2000); // TODO: Fix to not use browser.sleep
    studentDropDown.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    expect(element(by.id('studentHistoryTable')).isDisplayed()).toBe(true);
    element(by.id('studentHistoryTable'))
      .getText()
      .then(text => {
        expect(text).toContain('50');
        // expect(text).toContain('ooga booga');
        // expect(text).toContain('5');
        // expect(text).toContain('10');
        // expect(text).toContain('50');
        // expect(text).toContain('hooga wooga');
        // expect(text).toContain('take a load off');
      });

    // const elementFinderArray = await element.all(by.className('mat-row'));
    // elementFinderArray.forEach(async (elementFinder: ElementFinder, index) => {
    //   const text = await elementFinder.getText();
    //   if (text.includes('Student Test')) {
    //     elementFinder.click();
    //   }
    // });
    browser.sleep(3000);
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
    browser.sleep(1000);
    // log out of student
    logoutButton.click();
    await browser.restart();
    browser.get('/');
    checkStudentHistory();
  });

  it('should check student\'s history', () => {
    checkStudentHistory();
  });
});
