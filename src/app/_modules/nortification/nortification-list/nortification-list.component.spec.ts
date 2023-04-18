import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NortificationListComponent } from './nortification-list.component';

describe('NortificationListComponent', () => {
  let component: NortificationListComponent;
  let fixture: ComponentFixture<NortificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NortificationListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NortificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
