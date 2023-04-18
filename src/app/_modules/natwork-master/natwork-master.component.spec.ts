import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NatworkMasterComponent } from './natwork-master.component';

describe('NatworkMasterComponent', () => {
  let component: NatworkMasterComponent;
  let fixture: ComponentFixture<NatworkMasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NatworkMasterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NatworkMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
