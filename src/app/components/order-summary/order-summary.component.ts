import { Component, inject, Input } from '@angular/core';
import { Order } from '../../models/order.type';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';


@Component({
  selector: 'app-order-summary',
  imports: [],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.scss'
})
export class OrderSummaryComponent {
  @Input() order!: Order;

  router = inject(Router);
  orderService = inject(OrderService);
  cartService = inject(CartService);


  saveOrder(){
    this.orderService.proceedToCheckout(this.order).subscribe((res) => {
      alert('Order placed successfully!');
      this.cartService.clearCart();
    });
    this.router.navigate(['/']);
  }

}
