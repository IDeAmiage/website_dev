import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeCollectivitesComponent } from './home-collectivites.component';

describe('HomeCollectivitesComponent', () => {
  let component: HomeCollectivitesComponent;
  let fixture: ComponentFixture<HomeCollectivitesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeCollectivitesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeCollectivitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
