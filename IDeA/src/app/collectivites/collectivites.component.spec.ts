import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollectivitesComponent } from './collectivites.component';

describe('CollectivitesComponent', () => {
  let component: CollectivitesComponent;
  let fixture: ComponentFixture<CollectivitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollectivitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollectivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
