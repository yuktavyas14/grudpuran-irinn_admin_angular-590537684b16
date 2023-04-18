import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectmemberComponent } from './connectmember.component';

describe('ConnectmemberComponent', () => {
  let component: ConnectmemberComponent;
  let fixture: ComponentFixture<ConnectmemberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectmemberComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnectmemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
