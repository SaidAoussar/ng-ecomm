import { Component, inject } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart-item.type';


@Component({
  selector: 'app-cart',
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  cartService = inject(CartService);
  cart = this.cartService.items;
  subtotal = this.cartService.subtotal;


  updateQuantity(id: number, qty: number) {
    this.cartService.updateQuantity(id, qty);
  }

  remove(id: number) {
    this.cartService.removeProduct(id);
  }

  clear() {
    this.cartService.clearCart();
  }

  getProductTotal(item: CartItem){
    return (item.product.price * item.quantity).toFixed(2);
  }

}
