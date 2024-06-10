import { Component } from '@angular/core';
import { OrderService } from '../services/order/order.service';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.scss'
})
export class OrderManagementComponent {
 orders = [];

 constructor(private order: OrderService){}

 onInit(){
  this.showOrder();
 }

 showOrder(){
  this.order.getAll().subscribe((data) => this.orders = data);
 }

 delete(id: string){
  this.order.deleteOrder(id).subscribe(() => this.showOrder());
 }
}
