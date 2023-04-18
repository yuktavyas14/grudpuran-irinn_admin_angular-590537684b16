import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyListComponent } from './why-list.component';

describe('WhyListComponent', () => {
  let component: WhyListComponent;
  let fixture: ComponentFixture<WhyListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
