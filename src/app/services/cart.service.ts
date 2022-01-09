import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Cart } from '../models/Cart';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart: Cart = {} as Cart;
  productCounterEmitter = new Subject<number>();

  constructor() {
    this.cart.products = [];
  }

  getCart(): Cart {
    return this.cart;
  }

  addToCart(product: Product, quantity: number = 1): Cart {
    if (this.cart.products.find((p) => p.id === product.id)) {
      // modify existing product quantity
      this.cart.products.map((p) => {
        if (p.id === product.id) {
          p.quantity += quantity;
        }
      });
    } else {
      // add a new product
      this.cart.products.push({ ...product, quantity });
    }
    this.getTotalPrice();
    this.emitProductCounter();
    alert('Added to cart!');
    return this.cart;
  }

  updateCart(product: Product, quantity: number): Cart {
    this.cart.products.map((p) => {
      if (p.id === product.id) {
        p.quantity = quantity;
      }
    });
    this.getTotalPrice();
    this.emitProductCounter();
    return this.cart;
  }

  removeFromCart(id: string): Cart {
    const idx = this.cart.products.findIndex((p) => p.id === id);
    this.cart.products.splice(idx, 1);
    this.getTotalPrice();
    this.emitProductCounter();
    return this.cart;
  }

  clearCart(): Cart {
    this.cart.products = [];
    this.cart.totalPrice = 0;
    this.emitProductCounter();
    return this.cart;
  }

  private getTotalPrice(): number {
    return (this.cart.totalPrice = this.cart.products.reduce(
      (a, b) => +a + +b.price * +b.quantity,
      0
    ));
  }

  private emitProductCounter(): void {
    this.productCounterEmitter.next(
      this.cart.products.reduce((a, b) => +a + +b.quantity, 0)
    );
  }
}
