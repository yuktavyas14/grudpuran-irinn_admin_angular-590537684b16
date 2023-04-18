import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IspAcquisitionPartnerComponent } from './isp-acquisition-partner.component';

describe('IspAcquisitionPartnerComponent', () => {
  let component: IspAcquisitionPartnerComponent;
  let fixture: ComponentFixture<IspAcquisitionPartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IspAcquisitionPartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IspAcquisitionPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
