import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTneComponent } from './add-tne.component';

describe('AddTneComponent', () => {
  let component: AddTneComponent;
  let fixture: ComponentFixture<AddTneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
