import { OverlayContainer } from '@angular/cdk/overlay';
import { inject, ComponentFixture, flush } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class SelectMenuTestHelper {
  private container: OverlayContainer;
  private containerElement: HTMLElement;
  private trigger: HTMLElement;

  public constructor(private fixture: ComponentFixture<any>) {
    inject([OverlayContainer], (oc: OverlayContainer) => {
      this.container = oc;
      this.containerElement = oc.getContainerElement();
    })();
  }

  public triggerMenu() {
    this.fixture.detectChanges();
    this.trigger = this.fixture.debugElement.query(
      By.css('.mat-select-trigger')
    ).nativeElement;
    this.trigger.click();
    this.fixture.detectChanges();
  }

  public getOptions(): HTMLElement[] {
    return Array.from(this.containerElement.querySelectorAll('mat-option'));
  }

  public selectOption(option: HTMLElement, shouldFlush = true) {
    option.click();
    this.fixture.detectChanges();
    this.trigger.click();
    this.fixture.detectChanges();
    if (shouldFlush) {
      flush();
    }
  }

  public selectOptionByKey(options: HTMLElement[], key: string, shouldFlush = true) {
    options.forEach((option: HTMLElement) => {
      if (option.innerText.trim() === key) {
        this.selectOption(option, shouldFlush);
      }
    });
  }

  /**
   * Retrieves option
   * @param key - text in a dropdown menu (e.g. Squats)
   * @returns the HTMLElement of the option or null if that option does not exists in the list of options
   */
  public getOptionByKey(options: HTMLElement[], key: string): HTMLElement {
    let result: HTMLElement = null;
    options.forEach((option: HTMLElement) => {
      if (option.innerText.trim() === key) {
        result = option;
      }
    });
    return result;
  }

  public cleanup() {
    this.container.ngOnDestroy();
  }
}
