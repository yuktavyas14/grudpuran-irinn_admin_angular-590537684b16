import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoAddressComponent } from './logo-address.component';

describe('LogoAddressComponent', () => {
  let component: LogoAddressComponent;
  let fixture: ComponentFixture<LogoAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogoAddressComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogoAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
