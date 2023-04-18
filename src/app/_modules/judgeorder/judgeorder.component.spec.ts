import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JudgeorderComponent } from './judgeorder.component';

describe('JudgeorderComponent', () => {
  let component: JudgeorderComponent;
  let fixture: ComponentFixture<JudgeorderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JudgeorderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JudgeorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
