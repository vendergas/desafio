import { Component } from '@angular/core';
import { OrderManagementService } from '../services/order-management/order-management.service';

@Component({
  selector: 'app-order-management',
  standalone: true,
  imports: [],
  templateUrl: './order-management.component.html',
  styleUrl: './order-management.component.scss'
})
export class OrderManagementComponent {
 orders = [];

 constructor(private orderManagementService: OrderManagementService){}

 onInit(){
  this.showOrder();
 }

 showOrder(){
  this.orderManagementService.getAll().subscribe((data) => this.orders = data);
 }

 delete(id: string){
  this.orderManagementService.deleteOrder(id).subscribe(() => this.showOrder());
 }
}
