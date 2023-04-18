import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIspComponent } from './new-isp.component';

describe('NewIspComponent', () => {
  let component: NewIspComponent;
  let fixture: ComponentFixture<NewIspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewIspComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewIspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
