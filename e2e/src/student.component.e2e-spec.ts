// import { browser, by, element, protractor } from 'protractor';
//
// describe('Student Component e2e tests', () => {
//   const GOOGLE_USERNAME = 'test.angular.wla.student@gmail.com';
//   const GOOGLE_PASSWORD = 'testPassword19';
//   const ec = protractor.ExpectedConditions;
//   const BROWSER_WAIT = 8000;
//
//   /**
//    * [selectWindow Focus the browser to the index window.
//    * @param  index [Is the index of the window. E.g., 0=browser, 1=FBpopup]
//    */
//   const selectWindow = async (index: number) => {
//     // wait for handles[index] to exist
//     browser.wait(async () => {
//       const handles = await browser.getAllWindowHandles();
//       /**
//        * Assume that handles.length >= 1 and index >=0.
//        * So when calling selectWindow(index) return
//        * true if handles contains that window.
//        */
//       if (handles.length > index) {
//         return true;
//       }
//     }, 30000);
//     // switch to the window
//     const handlesPromise = await browser.getAllWindowHandles();
//     return browser.switchTo().window(handlesPromise[index]);
//   };
//   beforeAll(() => {
//     browser.get('/' + 'today-workout-student');
//     this.emailInput = element(by.id('identifierId'));
//     this.passwordInput = element(by.name('password'));
//     this.emailNextButton = element(by.id('identifierNext'));
//     this.passwordNextButton = element(by.id('passwordNext'));
//     this.signInButton = element(by.id('login'));
//     this.approveAccess = element(by.id('submit_approve_access'));
//
//     this.loginToGoogle = function() {
//       const self = this;
//
//       /* Entering non angular site, it instructs webdriver to switch
//        to synchronous mode. At this point I assume we are on google
//        login page */
//
//       browser.waitForAngularEnabled(false);
//       browser
//         .wait(ec.visibilityOf(self.emailInput), BROWSER_WAIT)
//         .then(() => {
//           this.emailInput.sendKeys(GOOGLE_USERNAME);
//           this.emailNextButton.click();
//           browser
//             .wait(ec.visibilityOf(self.passwordInput), BROWSER_WAIT)
//             .then(() => {
//               self.passwordInput.sendKeys(GOOGLE_PASSWORD);
//               self.passwordInput.sendKeys(protractor.Key.ENTER);
//               browser.waitForAngularEnabled(true);
//             });
//         });
//     };
//
//     this.signInButton.click();
//     selectWindow(1);
//     this.loginToGoogle();
//     selectWindow(0);
//     browser.wait(ec.visibilityOf(element(by.id('workout-label'))), BROWSER_WAIT);
//     element(by.id('workout-label')).click();
//   });
//
//   it('should find Exercise Form', () => {
//     expect(element(by.id('exercise-form')).isDisplayed()).toBe(true);
//   });
//
//   it('should open the Recommended Excercise table', () => {
//     const recExercises = element.all(by.css('mat-expansion-panel')).get(0);
//     recExercises.click();
//     browser.wait(ec.visibilityOf(element(by.id('recommended-exercises-table'))), this.BROWSER_WAIT);
//     expect(element(by.id('recommended-exercises-table')).isDisplayed()).toBe(true);
//     // close the expansion panel
//     recExercises.click();
//   });
//
//   it('should open the Today\'s Workout table', () => {
//     console.log(element.all(by.css('mat-expansion-panel')).count());
//     const todayExercises = element.all(by.css('mat-expansion-panel')).get(1);
//     todayExercises.click();
//     browser.wait(ec.visibilityOf(element(by.id('student-exercise-table'))), this.BROWSER_WAIT);
//     expect(element(by.id('student-exercise-table')).isDisplayed()).toBe(true);
//     // close the expansion panel
//     todayExercises.click();
//   });
//
//   // it('should find Logout button', () => {
//   //   console.log('Log out is here');
//   //   element(by.id('logout')).getText().then(text => {
//   //     console.log(text);
//   //   });
//   //   expect(element(by.id('logout')).isPresent()).toBe(true);
//   // });
// });
