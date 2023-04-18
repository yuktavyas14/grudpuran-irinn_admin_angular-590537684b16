import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItcComponent } from './itc.component';

describe('ItcComponent', () => {
  let component: ItcComponent;
  let fixture: ComponentFixture<ItcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
