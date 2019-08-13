import { browser, by, element, protractor } from 'protractor';
import { STUDENT_USERNAME, STUDENT_PASSWORD } from './google-login-info';

describe('Student Component e2e tests', () => {
  const GOOGLE_USERNAME = STUDENT_USERNAME;
  const GOOGLE_PASSWORD = STUDENT_PASSWORD;
  const ec = protractor.ExpectedConditions;
  const BROWSER_WAIT = 8000;
  const reps = element(by.id('reps-input'));
  const weight = element(by.id('weight-input'));
  const comment = element(by.id('comments-input'));

  const hasText = (elementFinder, queryText: string) => {
    const searchesForText = () => {
      return elementFinder.getText().then(actualTextResultedFromAPromise => {
        return actualTextResultedFromAPromise.includes(queryText);
      });
    };
    return ec.and(ec.presenceOf(elementFinder), searchesForText);
  };

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

  const selectGroup = () => {
    const groupSelect = element(by.id('group-select'));
    const viewWorkout = element(by.id('workout-button'));
    browser.sleep(3000); // TODO don't use sleep
    groupSelect.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    viewWorkout.click();
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
      browser.wait(ec.visibilityOf(self.emailInput), BROWSER_WAIT).then(() => {
        this.emailInput.sendKeys(GOOGLE_USERNAME);
        this.emailNextButton.click();
        browser
          .wait(ec.visibilityOf(self.passwordInput), BROWSER_WAIT)
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
      ec.visibilityOf(element(by.id('logout'))),
      BROWSER_WAIT,
      'timed out waiting for Logout button to appear'
    );
    browser.wait(
      ec.visibilityOf(element(by.id('home'))),
      BROWSER_WAIT,
      'timed out waiting for home button'
    );
    element(by.id('home')).click();
    browser.wait(ec.visibilityOf(element(by.css('.mat-select'))));
    selectGroup();
  });

  afterEach(() => {
    reps.clear();
    weight.clear();
    comment.clear();
  });

  // Causes timeout error for the test
  // afterAll(() => {
  //   element(by.id('logout')).click();
  // });

  it('should find Exercise Form', () => {
    expect(element(by.id('exercise-form')).isDisplayed()).toBe(true);
  });

  it('should open the Recommended Excercise table', () => {
    const recExercises = element.all(by.css('mat-expansion-panel')).get(0);
    recExercises.click();
    browser.wait(
      ec.visibilityOf(element(by.id('recommended-exercises-table'))),
      this.BROWSER_WAIT
    );
    expect(element(by.id('recommended-exercises-table')).isDisplayed()).toBe(
      true
    );
    // close the expansion panel
    recExercises.click();
  });

  it('should display selected exercise', () => {
    const dropdown = element(by.id('exercise-select'));
    dropdown.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    const studentExercises = element.all(by.css('mat-expansion-panel')).get(1);
    studentExercises.getText().then(text => {
      expect(text).toContain('Ooga Booga');
    });
  });

  it('should find today\'s workout button', () => {
    expect(element(by.id('workout-label')).isPresent()).toBe(true);
  });

  it('should set correct value of all attributes', () => {
    const deleteButton = element.all(by.id('delete')).first();
    const dropdown = element(by.id('exercise-select'));
    dropdown.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    reps.click();
    reps.sendKeys('20');
    weight.click();
    weight.sendKeys('100');
    comment.click();
    comment.sendKeys('Keep knees behind toes');
    element(by.id('next-btn')).click();
    browser.wait(
      ec.elementToBeClickable(element(by.id('exercises-expansion'))),
      3000
    );
    browser.waitForAngularEnabled(false);
    element(by.id('exercises-expansion')).click();
    browser.wait(
      ec.visibilityOf(element(by.id('student-exercise-table'))),
      3000
    );
    // putting browser.waitForAngularEnabled any lower in the code or removing it
    // causes a timeout error
    // TODO: investigate why browser.waitForAngularEnabled is needed.
    expect(element(by.id('student-exercise-table')).isDisplayed()).toBe(true);
    browser.wait(
      hasText(
        element(by.id('student-exercise-table')),
        'Keep knees behind toes'
      ),
      3000,
      'Timed out waiting for table to contain new text'
    );
    element(by.id('student-exercise-table'))
      .getText()
      .then(text => {
        expect(text).toContain('Keep knees behind toes');
        expect(text).toContain('20');
        expect(text).toContain('100');
        browser.waitForAngularEnabled(false);
      });
    deleteButton.click();
    element
      .all(by.css('.mat-expansion-panel-header'))
      .last()
      .click();
  });

  it('should filter student exercises by date', () => {
    const deleteButton = element.all(by.id('delete')).first();
    const dropdown = element(by.css('.mat-select'));
    browser.wait(
      ec.elementToBeClickable(element(by.id('exercise-select'))),
      3000
    );
    dropdown.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    reps.click();
    reps.sendKeys('50');
    weight.click();
    weight.sendKeys('20');
    comment.click();
    comment.sendKeys('new squat');
    element(by.id('next-btn')).click();
    browser.wait(
      ec.elementToBeClickable(element(by.id('exercises-expansion'))),
      3000
    );
    browser.waitForAngularEnabled(false);
    element(by.id('exercises-expansion')).click();
    // expect(element(by.id('student-exercise-table')).isDisplayed()).toBe(true);
    browser.wait(
      hasText(element(by.id('student-exercise-table')), 'new squat'),
      3000,
      'Timed out waiting for table to contain new squat'
    );
    element(by.id('student-exercise-table'))
      .getText()
      .then(text => {
        expect(text).toContain('50');
        expect(text).toContain('20');
        expect(text).not.toContain('old squat');
        expect(text).toContain('new squat');
        browser.waitForAngularEnabled(false);
      });
    deleteButton.click();
    element
      .all(by.css('.mat-expansion-panel-header'))
      .last()
      .click();
  });

  it('should edit an exercises and set values in table correctly', () => {
    const editButton = element.all(by.id('edit')).first();
    const deleteButton = element.all(by.id('delete')).first();
    const dialogReps = element(by.id('dialog-reps-input'));
    const dialogWeight = element(by.id('dialog-weight-input'));
    const dialogComments = element(by.id('dialog-comments-input'));
    const dropdown = element(by.css('.mat-select'));
    browser.wait(
      ec.elementToBeClickable(element(by.id('exercise-select'))),
      3000
    );
    dropdown.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    reps.click();
    reps.sendKeys('50');
    weight.click();
    weight.sendKeys('20');
    comment.click();
    comment.sendKeys('new squat');
    element(by.id('next-btn')).click();
    browser.wait(
      ec.elementToBeClickable(element(by.id('exercises-expansion'))),
      3000
    );
    browser.waitForAngularEnabled(false);
    element(by.id('exercises-expansion')).click();
    browser.wait(
      hasText(element(by.id('student-exercise-table')), 'new squat'),
      3000,
      'Timed out waiting for table to contain new squat'
    );
    editButton.click();
    browser.wait(dialogReps.isDisplayed, 3000);
    dialogReps.click();
    dialogReps.sendKeys('00');
    dialogWeight.click();
    dialogWeight.sendKeys('00');
    dialogComments.click();
    dialogComments.sendKeys('s are cool');
    element(by.id('submit-button')).click();
    element(by.id('student-exercise-table'))
      .getText()
      .then(text => {
        expect(text).toContain('5000');
        expect(text).toContain('2000');
        expect(text).toContain('new squats are cool');
      });
    deleteButton.click();
    element
      .all(by.css('.mat-expansion-panel-header'))
      .last()
      .click();
  });

  it('should delete an exercise', () => {
    const deleteButton = element.all(by.id('delete')).first();
    const dropdown = element(by.css('.mat-select'));
    browser.wait(
      ec.elementToBeClickable(element(by.id('exercise-select'))),
      3000
    );
    dropdown.click();
    element
      .all(by.css('.mat-option'))
      .first()
      .click();
    reps.click();
    reps.sendKeys('50');
    weight.click();
    weight.sendKeys('20');
    comment.click();
    comment.sendKeys('new squat');
    element(by.id('next-btn')).click();
    browser.wait(
      ec.elementToBeClickable(element(by.id('exercises-expansion'))),
      3000
    );
    browser.waitForAngularEnabled(false);
    element(by.id('exercises-expansion')).click();
    browser.wait(
      hasText(element(by.id('student-exercise-table')), 'new squat'),
      3000,
      'Timed out waiting for table to contain new squat'
    );
    deleteButton.click();
    element(by.id('student-exercise-table'))
      .getText()
      .then(text => {
        expect(text).not.toContain('50');
        expect(text).not.toContain('20');
        expect(text).not.toContain('new squat');
      });
    element
      .all(by.css('.mat-expansion-panel-header'))
      .last()
      .click();
  });

  // TODO test that the student only sees today's exercises
});
