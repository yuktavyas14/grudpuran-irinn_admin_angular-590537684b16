import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestupdateComponent } from './latestupdate.component';

describe('LatestupdateComponent', () => {
  let component: LatestupdateComponent;
  let fixture: ComponentFixture<LatestupdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatestupdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestupdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
