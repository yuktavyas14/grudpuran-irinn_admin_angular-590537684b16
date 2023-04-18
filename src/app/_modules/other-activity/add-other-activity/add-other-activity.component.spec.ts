import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddOtherActivityComponent } from './add-other-activity.component';

describe('AddOtherActivityComponent', () => {
  let component: AddOtherActivityComponent;
  let fixture: ComponentFixture<AddOtherActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddOtherActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddOtherActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
