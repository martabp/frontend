import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DwscDashboard } from './dwsc-dashboard';

describe('DwscDashboard', () => {
  let component: DwscDashboard;
  let fixture: ComponentFixture<DwscDashboard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DwscDashboard],
    }).compileComponents();

    fixture = TestBed.createComponent(DwscDashboard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
