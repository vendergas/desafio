import { Component } from '@angular/core';
import { OrderService } from '../services/order/order.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-release',
  standalone: true,
  imports: [],
  templateUrl: './order-release.component.html',
  styleUrl: './order-release.component.scss'
})
export class OrderReleaseComponent {
  order: FormGroup;
  submitted: boolean = false;
  success: boolean = false;
  fail: boolean = false;

  constructor(private formBuilder: FormBuilder, private orderService: OrderService){
    this.order = this.formBuilder.group({
      orderNumber: ["", Validators.required],
      orderClientName: ["", Validators.required],
      orderCompanyName: ["", Validators.required],
      orderDetails: ["", Validators.required],
      orderDate: ["", Validators.required]
    })
  }

  get formControls(){
    return this.order.controls;
  }

  onSubmit(){
    this.submitted = true;

    this.orderService.generateOrder(this.order).subscribe({
      next: request => {
        console.log(`Request: ${request}`);
        this.success = true;
      },
      error: error => {
        console.log(`Error: ${error}`);
        this.fail = true;
      }
    })
  }
}
