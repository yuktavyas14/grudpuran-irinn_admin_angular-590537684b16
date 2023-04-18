import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResourseComponent } from './add-resourse.component';

describe('AddResourseComponent', () => {
  let component: AddResourseComponent;
  let fixture: ComponentFixture<AddResourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddResourseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddResourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
