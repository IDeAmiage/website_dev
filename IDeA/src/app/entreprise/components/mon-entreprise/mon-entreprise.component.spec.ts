/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MonEntrepriseComponent } from './mon-entreprise.component';

describe('MonEntrepriseComponent', () => {
  let component: MonEntrepriseComponent;
  let fixture: ComponentFixture<MonEntrepriseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MonEntrepriseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MonEntrepriseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
