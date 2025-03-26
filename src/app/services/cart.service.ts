import { computed, effect, Injectable, signal } from '@angular/core';
import { CartItem } from '../models/cart-item.type';
import { Product } from '../models/product.type';

const STORAGE_KEY = 'cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private initialCart = this.loadCart();
  private cart = signal<CartItem[]>(this.initialCart);
  readonly items = this.cart.asReadonly();

  readonly subtotal = computed(() =>
    this.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)
  );

  constructor() {
    // Persist to localStorage
    effect(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.cart()));
    });
  }


  addProduct(product: Product): void {
    const existing = this.cart().find((item) => item.product.id === product.id);
    if (existing) {
      this.updateQuantity(product.id, existing.quantity + 1);
    } else {
      this.cart.update((items) => [...items, { product :product, quantity: 1 }]);
    }
  }


  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeProduct(productId);
      return;
    }
    this.cart.update((items) =>
      items.map((item) =>
        item.product.id === productId ? { product: item.product, quantity } : item
      )
    );
  }

  removeProduct(productId: number): void {
    this.cart.update((items) => items.filter((item) => item.product.id !== productId));
  }

  clearCart(): void {
    this.cart.set([]);
  }

  plusProductQte(id: number): void {
    const existing = this.cart().find((item) => item.product.id === id);
    if (existing) {
      this.updateQuantity(id, existing.quantity + 1);
    }
  }


  minusProductQte(id: number): void {
    const existing = this.cart().find((item) => item.product.id === id);
    if (existing && existing.quantity >= 1) {
      this.updateQuantity(id, existing.quantity - 1);
    }
  }


  private loadCart(): CartItem[] {
    const raw = localStorage.getItem(STORAGE_KEY);
    try {
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
