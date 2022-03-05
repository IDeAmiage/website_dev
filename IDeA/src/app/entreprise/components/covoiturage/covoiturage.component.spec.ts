import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CovoiturageComponent } from './covoiturage.component';

describe('CovoiturageComponent', () => {
  let component: CovoiturageComponent;
  let fixture: ComponentFixture<CovoiturageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CovoiturageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CovoiturageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
