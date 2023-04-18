import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIspComponent } from './add-isp.component';

describe('AddIspComponent', () => {
  let component: AddIspComponent;
  let fixture: ComponentFixture<AddIspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddIspComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddIspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
