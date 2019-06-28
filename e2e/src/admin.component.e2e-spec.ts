import { browser, by, element, Ptor, protractor } from 'protractor';
import {AdminComponent} from '../../src/app/admin/admin.component';
import {PostDialogComponent} from '../../src/app/post-dialog/post-dialog.component';

describe('Admin Component e2e test', () => {
  beforeAll(() => {
    browser.get('/' + 'today-workout-admin');
    element(by.id('add-button')).click();
  });

  // it('should find Add Exercise button', () => {
  //   expect(document).toContain(element(by.id('dialog')));
  // });

  it('should set correct value of all attributes', () => {
    const name = element(by.id('name-input'));
    const sets = element(by.id('sets-input'));
    const reps = element(by.id('reps-input'));
    const weight = element(by.id('weight-input'));
    const comments = element(by.id('comments-input'));
    name.click();
    name.sendKeys('tim');
    sets.click();
    sets.sendKeys('50');
    reps.click();
    reps.sendKeys('20');
    weight.click();
    weight.sendKeys('100');
    comments.click();
    comments.sendKeys('No comment');
    element(by.id('submit-button')).click();
    // console.log(element(by.id('name-cell')).getText());
    expect(element(by.id('table'))).toContain('tim');
    expect(element(by.id('table'))).toContain('50');
    expect(element(by.id('table'))).toContain('20');
    expect(element(by.id('table'))).toContain('100');

  });

});
