import { TestBed } from '@angular/core/testing';

import { ResoursepartnerService } from './resoursepartner.service';

describe('ResoursepartnerService', () => {
  let service: ResoursepartnerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResoursepartnerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
