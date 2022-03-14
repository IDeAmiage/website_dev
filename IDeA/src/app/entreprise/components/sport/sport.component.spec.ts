/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SportComponent } from './sport.component';

describe('SportComponent', () => {
  let component: SportComponent;
  let fixture: ComponentFixture<SportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
