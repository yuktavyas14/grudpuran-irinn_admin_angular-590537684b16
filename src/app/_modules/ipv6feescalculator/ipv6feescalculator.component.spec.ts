import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ipv6feescalculatorComponent } from './ipv6feescalculator.component';

describe('Ipv6feescalculatorComponent', () => {
  let component: Ipv6feescalculatorComponent;
  let fixture: ComponentFixture<Ipv6feescalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Ipv6feescalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ipv6feescalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
