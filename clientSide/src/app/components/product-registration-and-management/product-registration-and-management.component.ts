import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductRegistrationAndManagementService } from '../services/product-registration-and-management/product-registration-and-management.service';

@Component({
  selector: 'app-product-registration-and-management',
  standalone: true,
  imports: [],
  templateUrl: './product-registration-and-management.component.html',
  styleUrl: './product-registration-and-management.component.scss'
})
export class ProductRegistrationAndManagementComponent {
  product!: FormGroup;
  products!: FormGroup[];
  submitted: boolean = false;
  success: boolean = false;
  fail: boolean = false;

  constructor(private formBuilder: FormBuilder, private productRegistrationAndManagementService: ProductRegistrationAndManagementService){}

  ngOnInit(){
    this.product = this.formBuilder.group({
      name: ["", Validators.required],
      value: ["", Validators.required],
      description: ["", Validators.required],
      company: ["", Validators.required]
    });
    this.showProducts();
  }

  get formControls(){
    return this.product.controls;
  }

  showProducts(){
    this.productRegistrationAndManagementService.getAll().subscribe((data) => this.products = [data]);
  }

  onSubmit(){
    this.submitted = true;

    this.productRegistrationAndManagementService.register(this.product).subscribe({
      next: response => {
        console.log(`response: ${response}`);
        this.success = true;
      },

      error: error => {
        console.log(`error: ${error}`);
        this.fail = true;
      }
    });
  }
}
