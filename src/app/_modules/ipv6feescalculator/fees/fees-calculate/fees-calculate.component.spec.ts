import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeesCalculateComponent } from './fees-calculate.component';

describe('FeesCalculateComponent', () => {
  let component: FeesCalculateComponent;
  let fixture: ComponentFixture<FeesCalculateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FeesCalculateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeesCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
