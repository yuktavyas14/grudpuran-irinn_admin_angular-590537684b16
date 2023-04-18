import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubHeaderListComponent } from './sub-header-list.component';

describe('SubHeaderListComponent', () => {
  let component: SubHeaderListComponent;
  let fixture: ComponentFixture<SubHeaderListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubHeaderListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubHeaderListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
