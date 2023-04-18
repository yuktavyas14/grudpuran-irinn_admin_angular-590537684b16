import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacilityMemberComponent } from './facility-member.component';

describe('FacilityMemberComponent', () => {
  let component: FacilityMemberComponent;
  let fixture: ComponentFixture<FacilityMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FacilityMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacilityMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
