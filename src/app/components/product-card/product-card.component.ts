import { Component, inject, Input} from '@angular/core';
import { Product } from '../../models/product.type';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  @Input() product!:Product;
  successMessage: string | null = null;


  cartService = inject(CartService);


  addToCart(){
    this.cartService.addProduct(this.product);
    this.successMessage = `${this.product.name} has been added to your cart!`;
    setTimeout(() => {
      this.successMessage = null;
    }, 3000);
  }


  getProductRatingFloor(){
    return Math.floor(this.product.rating)
  }

}
