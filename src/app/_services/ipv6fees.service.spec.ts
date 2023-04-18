import { TestBed } from '@angular/core/testing';

import { Ipv6feesService } from './ipv6fees.service';

describe('Ipv6feesService', () => {
  let service: Ipv6feesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Ipv6feesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
