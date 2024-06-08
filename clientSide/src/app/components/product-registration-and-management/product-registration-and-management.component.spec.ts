import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRegistrationAndManagementComponent } from './product-registration-and-management.component';

describe('ProductRegistrationAndManagementComponent', () => {
  let component: ProductRegistrationAndManagementComponent;
  let fixture: ComponentFixture<ProductRegistrationAndManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductRegistrationAndManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRegistrationAndManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
