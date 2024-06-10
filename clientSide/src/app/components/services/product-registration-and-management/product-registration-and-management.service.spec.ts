import { TestBed } from '@angular/core/testing';

import { ProductRegistrationAndManagementService } from './product-registration-and-management.service';

describe('ProductRegistrationAndManagementService', () => {
  let service: ProductRegistrationAndManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductRegistrationAndManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
