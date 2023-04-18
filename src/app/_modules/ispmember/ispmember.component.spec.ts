import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspmemberComponent } from './ispmember.component';

describe('IspmemberComponent', () => {
  let component: IspmemberComponent;
  let fixture: ComponentFixture<IspmemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IspmemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IspmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
