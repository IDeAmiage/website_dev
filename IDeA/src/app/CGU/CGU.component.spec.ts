/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { CGUComponent } from './CGU.component';

describe('CGUComponent', () => {
  let component: CGUComponent;
  let fixture: ComponentFixture<CGUComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CGUComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CGUComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
