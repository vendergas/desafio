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
  product: FormGroup;
  products = [];
  submitted: boolean = false;
  success: boolean = false;
  fail: boolean = false;

  constructor(private formBuilder: FormBuilder, private productRegistrationAndManagementService: ProductRegistrationAndManagementService){
    this.product = this.formBuilder.group({
      id: [null],
      name: ["", Validators.required],
      value: ["", Validators.required],
      description: ["", Validators.required],
      company: ["", Validators.required]
    });
  }

  ngOnInit(){
    this.showProducts();
  }

  get formControls(){
    return this.product.controls;
  }

  showProducts(){
    this.productRegistrationAndManagementService.getAll().subscribe((data) => this.products = data);
  }

  onSubmit(){
    this.submitted = true;

    if(this.product.value.id){
      this.productRegistrationAndManagementService.edit(this.product.value).subscribe(() => {
        this.showProducts();
        this.resetForm();
      });
    } else{
      this.productRegistrationAndManagementService.register(this.product).subscribe(() => {
        this.showProducts();
        this.resetForm();
      });
    }
  }

  onEdit(productForm: FormGroup){
    this.product.setValue(productForm);
  }

  edit(id: string){
    this.productRegistrationAndManagementService.edit(id);
  }

  delet(id: string){
    this.productRegistrationAndManagementService.deleteProduct(id);
  }

  resetForm(){
    this.product.reset({id: null, name: "", value: "", description: "", company: ""});
  }
}