import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewispComponent } from './add-newisp.component';

describe('AddNewispComponent', () => {
  let component: AddNewispComponent;
  let fixture: ComponentFixture<AddNewispComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNewispComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNewispComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
