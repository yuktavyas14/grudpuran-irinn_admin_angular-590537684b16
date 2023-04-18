import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddConnectmemberComponent } from './add-connectmember.component';

describe('AddConnectmemberComponent', () => {
  let component: AddConnectmemberComponent;
  let fixture: ComponentFixture<AddConnectmemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddConnectmemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddConnectmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
