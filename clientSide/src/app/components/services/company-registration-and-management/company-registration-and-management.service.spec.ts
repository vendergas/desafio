import { TestBed } from '@angular/core/testing';

import { CompanyRegistrationAndManagementService } from './company-registration-and-management.service';

describe('CompanyRegistrationAndManagementService', () => {
  let service: CompanyRegistrationAndManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompanyRegistrationAndManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
