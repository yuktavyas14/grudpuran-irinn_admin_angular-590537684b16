import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMenuListComponent } from './add-menu-list.component';

describe('AddMenuListComponent', () => {
  let component: AddMenuListComponent;
  let fixture: ComponentFixture<AddMenuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMenuListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMenuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
