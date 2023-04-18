import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVideoGalleryComponent } from './add-video-gallery.component';

describe('AddVideoGalleryComponent', () => {
  let component: AddVideoGalleryComponent;
  let fixture: ComponentFixture<AddVideoGalleryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVideoGalleryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVideoGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
