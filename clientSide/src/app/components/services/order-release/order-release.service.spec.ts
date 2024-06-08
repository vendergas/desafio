import { TestBed } from '@angular/core/testing';

import { OrderReleaseService } from './order-release.service';

describe('OrderReleaseService', () => {
  let service: OrderReleaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderReleaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
