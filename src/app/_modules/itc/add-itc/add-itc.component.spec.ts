import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItcComponent } from './add-itc.component';

describe('AddItcComponent', () => {
  let component: AddItcComponent;
  let fixture: ComponentFixture<AddItcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddItcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
