import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePartnerComponent } from './resource-partner.component';

describe('ResourcePartnerComponent', () => {
  let component: ResourcePartnerComponent;
  let fixture: ComponentFixture<ResourcePartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcePartnerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResourcePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
