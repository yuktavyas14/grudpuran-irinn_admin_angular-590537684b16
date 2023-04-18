import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMasterMenuComponent } from './add-master-menu.component';

describe('AddMasterMenuComponent', () => {
  let component: AddMasterMenuComponent;
  let fixture: ComponentFixture<AddMasterMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMasterMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMasterMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
