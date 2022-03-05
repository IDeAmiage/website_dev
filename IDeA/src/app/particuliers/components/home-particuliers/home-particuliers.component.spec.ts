import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeParticuliersComponent } from './home-particuliers.component';

describe('HomeParticuliersComponent', () => {
  let component: HomeParticuliersComponent;
  let fixture: ComponentFixture<HomeParticuliersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeParticuliersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeParticuliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
