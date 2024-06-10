import { TestBed } from '@angular/core/testing';

import { ClientRegistrationAndManagementService } from './client-registration-and-management.service';

describe('ClientRegistrationAndManagementService', () => {
  let service: ClientRegistrationAndManagementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientRegistrationAndManagementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
