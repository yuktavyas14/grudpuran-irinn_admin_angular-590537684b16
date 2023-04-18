import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddGlobalDataComponent } from './add-global-data.component';

describe('AddGlobalDataComponent', () => {
  let component: AddGlobalDataComponent;
  let fixture: ComponentFixture<AddGlobalDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddGlobalDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddGlobalDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
