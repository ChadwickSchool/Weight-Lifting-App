import { browser, by, element, Ptor, protractor } from 'protractor';
import { AdminComponent } from '../../src/app/admin/admin.component';
import { PostDialogComponent } from '../../src/app/post-dialog/post-dialog.component';

// describe('Admin Component e2e test', () => {
//   const EC = protractor.ExpectedConditions;
//   beforeAll(() => {
//     browser.get('/' + 'today-workout-admin');
//   });
//
//   it('should find Add Exercise button', () => {
//     expect(element(by.id('add-button')).isDisplayed()).toBe(true);
//   });
//
//   it('should set correct value of all attributes', () => {
//     const name = element(by.id('name-input'));
//     const sets = element(by.id('sets-input'));
//     const reps = element(by.id('reps-input'));
//     const weight = element(by.id('weight-input'));
//     const comments = element(by.id('comments-input'));
//     browser.waitForAngularEnabled(false);
//     element(by.id('add-button')).click();
//     browser.wait(EC.visibilityOf(element(by.id('dialog'))), 3000);
//     name.click();
//     name.sendKeys('test');
//     sets.click();
//     sets.sendKeys('50');
//     reps.click();
//     reps.sendKeys('20');
//     weight.click();
//     weight.sendKeys('100');
//     comments.click();
//     comments.sendKeys('No comment');
//     element(by.id('submit-button')).click();
//     browser.wait(EC.visibilityOf(element(by.id('exerciseTable'))), 3000);
//     element(by.id('exerciseTable'))
//       .getText()
//       .then(text => {
//         console.log('recieve text');
//         expect(text).toContain('test');
//         expect(text).toContain('50');
//         expect(text).toContain('20');
//         expect(text).toContain('100');
//       });
//   });
// });
