import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { AdminHomeComponent } from './admin-home.component';
import { DebugElement } from '@angular/core';
import { SelectMenuTestHelper } from '../shared/utils/select-menu-helper';
import { Observable, of } from 'rxjs';
import TestUtils from '../shared/utils/test-utils';
import { MaterialModule } from '../shared/material.module';
import { FormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { GroupService } from '../services/groups.service';

describe('AdminHomeComponent', () => {
  let component: AdminHomeComponent;
  let fixture: ComponentFixture<any>;
  let componentDebug: DebugElement;
  let componentElement: HTMLElement;

  let options: HTMLElement[];
  let selectMenu: SelectMenuTestHelper;

  const groupServiceStub = {
    getAddedGroups(): Observable<any> {
      return of([
        TestUtils.getTestGroup('Basketball'),
        TestUtils.getTestGroup('Soccer'),
        TestUtils.getTestGroup('Volleyball')
      ]);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, FormsModule, NoopAnimationsModule],
      declarations: [ AdminHomeComponent ],
      providers: [
        {
          provide: GroupService,
          useValue: groupServiceStub
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminHomeComponent);
    component = fixture.componentInstance;
    componentDebug = fixture.debugElement;
    componentElement = componentDebug.nativeElement;
    selectMenu = new SelectMenuTestHelper(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display groups correctly in the dropdown menu', () => {
    selectMenu.triggerMenu();
    options = selectMenu.getOptions();
    const basketballElement = selectMenu.getOptionByKey(options, 'Basketball');
    const soccerElement = selectMenu.getOptionByKey(options, 'Soccer');
    const volleyballElement = selectMenu.getOptionByKey(options, 'Volleyball');
    expect(basketballElement).not.toBeNull();
    expect(soccerElement).not.toBeNull();
    expect(volleyballElement).not.toBeNull();
  });


});
