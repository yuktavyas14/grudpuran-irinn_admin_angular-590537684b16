import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFacilityMemberComponent } from './add-facility-member.component';

describe('AddFacilityMemberComponent', () => {
  let component: AddFacilityMemberComponent;
  let fixture: ComponentFixture<AddFacilityMemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFacilityMemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFacilityMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
