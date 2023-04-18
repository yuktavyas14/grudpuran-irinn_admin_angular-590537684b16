import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJudeorderComponent } from './add-judeorder.component';

describe('AddJudeorderComponent', () => {
  let component: AddJudeorderComponent;
  let fixture: ComponentFixture<AddJudeorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJudeorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJudeorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
