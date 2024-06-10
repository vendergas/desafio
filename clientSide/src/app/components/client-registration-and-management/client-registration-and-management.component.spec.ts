import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRegistrationAndManagementComponent } from './client-registration-and-management.component';

describe('ClientRegistrationAndManagementComponent', () => {
  let component: ClientRegistrationAndManagementComponent;
  let fixture: ComponentFixture<ClientRegistrationAndManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientRegistrationAndManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientRegistrationAndManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
