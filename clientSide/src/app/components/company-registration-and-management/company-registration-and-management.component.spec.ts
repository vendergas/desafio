import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegistrationAndManagementComponent } from './company-registration-and-management.component';

describe('CompanyRegistrationAndManagementComponent', () => {
  let component: CompanyRegistrationAndManagementComponent;
  let fixture: ComponentFixture<CompanyRegistrationAndManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompanyRegistrationAndManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompanyRegistrationAndManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
