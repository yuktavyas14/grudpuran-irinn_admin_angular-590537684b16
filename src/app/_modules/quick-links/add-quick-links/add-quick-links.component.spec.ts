import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuickLinksComponent } from './add-quick-links.component';

describe('AddQuickLinksComponent', () => {
  let component: AddQuickLinksComponent;
  let fixture: ComponentFixture<AddQuickLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddQuickLinksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddQuickLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
