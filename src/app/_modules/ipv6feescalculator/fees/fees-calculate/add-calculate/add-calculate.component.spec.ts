import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCalculateComponent } from './add-calculate.component';

describe('AddCalculateComponent', () => {
  let component: AddCalculateComponent;
  let fixture: ComponentFixture<AddCalculateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCalculateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCalculateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
