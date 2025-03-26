import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { OrderService } from '../../services/order.service';
import { Order } from '../../models/order.type';
import { CartService } from '../../services/cart.service';
import { OrderItem } from '../../models/order-item.type';
import { OrderSummaryComponent } from '../order-summary/order-summary.component';

@Component({
  selector: 'app-checkout',
  imports: [CommonModule, ReactiveFormsModule, OrderSummaryComponent],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss'
})
export class CheckoutComponent {

  fb = inject(FormBuilder);

  cartService = inject(CartService);
  cart = this.cartService.items;
  subtotal = this.cartService.subtotal;
  showOrderSummary = false;
  order!: Order;


  checkoutForm!: FormGroup;

  ngOnInit(){
    this.checkoutForm = this.fb.group({
      // Shipping
      fullName: ['', Validators.required],
      streetAddress: ['', Validators.required],
      apartment: [''],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zipCode: ['', Validators.required],
      country: ['', Validators.required],
      phoneNumber: ['', Validators.required],


      // Payment
      paymentType: ['creditCard'],
      cardNumber: [''],
      nameOnCard: [''],
      expirationDate: [''],
      cvv: ['']
    });
  }


  submitOrder(){
    if(this.checkoutForm.valid){
      this.showOrderSummary = true;
    }else{
      console.log(this.getInvalidControls());
      console.log(this.checkoutForm.controls)
    }


    const form = this.checkoutForm.value;

    const shippingAddress = {
      fullName: form.fullName,
      streetAddress: form.streetAddress,
      apartment: form.apartment,
      city: form.city,
      state: form.state,
      zipCode: form.zipCode,
      country: form.country,
      phoneNumber: form.phoneNumber
    };


     this.order = {
      id: Date.now(),
      items: this.cart().map((cartItem):OrderItem => ({
        productId: cartItem.product.id,
        productName: cartItem.product.name,
        quantity: cartItem.quantity,
        unitPrice: cartItem.product.price,
        subtotal: +(cartItem.quantity * cartItem.product.price).toFixed(2),
      })),
      shippingAddress,
      billingAddress: shippingAddress,
      paymentMethod: {
        type: form.paymentType,
        cardNumber: form.cardNumber,
        nameOnCard: form.nameOnCard,
        expirationDate: form.expirationDate,
        cvv: form.cvv
      },
      subtotal: parseFloat(this.subtotal()),
      shippingCost: 0,
      tax: 0,
      total: parseFloat(this.subtotal()),
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    }

    getInvalidControls(): string[] {
      const invalid = [];
      const controls = this.checkoutForm.controls;

      for (const name in controls) {
        if (controls[name]?.invalid && (controls[name]?.touched || controls[name]?.dirty)) {
          invalid.push(name);
        }
      }

      return invalid;
    }

  }












