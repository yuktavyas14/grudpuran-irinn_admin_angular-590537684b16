import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyAddComponent } from './why-add.component';

describe('WhyAddComponent', () => {
  let component: WhyAddComponent;
  let fixture: ComponentFixture<WhyAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
