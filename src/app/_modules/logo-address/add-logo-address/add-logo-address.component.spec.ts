import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddLogoAddressComponent } from './add-logo-address.component';

describe('AddLogoAddressComponent', () => {
  let component: AddLogoAddressComponent;
  let fixture: ComponentFixture<AddLogoAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddLogoAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddLogoAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
