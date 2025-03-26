import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../models/product.type';
import { ApiService } from '../../services/api.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss'
})
export class ProductDetailComponent implements OnInit {
  @Input() id!: string

  apiService = inject(ApiService);
  cartService = inject(CartService);
  successMessage: string | null = null;



  product!: Product;


  ngOnInit(): void {
    this.apiService.getProductById(+this.id).subscribe((data) => {
      this.product = data;
      console.log(data);


    });
  }

  addToCard(){
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
