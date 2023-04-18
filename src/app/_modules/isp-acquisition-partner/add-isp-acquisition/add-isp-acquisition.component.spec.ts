import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIspAcquisitionComponent } from './add-isp-acquisition.component';

describe('AddIspAcquisitionComponent', () => {
  let component: AddIspAcquisitionComponent;
  let fixture: ComponentFixture<AddIspAcquisitionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIspAcquisitionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIspAcquisitionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
