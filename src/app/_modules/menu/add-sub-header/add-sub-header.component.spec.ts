import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSubHeaderComponent } from './add-sub-header.component';

describe('AddSubHeaderComponent', () => {
  let component: AddSubHeaderComponent;
  let fixture: ComponentFixture<AddSubHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSubHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSubHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
