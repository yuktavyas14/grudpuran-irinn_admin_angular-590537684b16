import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TneComponent } from './tne.component';

describe('TneComponent', () => {
  let component: TneComponent;
  let fixture: ComponentFixture<TneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
