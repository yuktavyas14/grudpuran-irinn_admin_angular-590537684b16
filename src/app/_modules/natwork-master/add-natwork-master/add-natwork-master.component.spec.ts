import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNatworkMasterComponent } from './add-natwork-master.component';

describe('AddNatworkMasterComponent', () => {
  let component: AddNatworkMasterComponent;
  let fixture: ComponentFixture<AddNatworkMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddNatworkMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddNatworkMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
