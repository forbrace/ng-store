import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/Product';
import { Router } from '@angular/router';
import { Cart } from '../../models/Cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cart: Cart = {} as Cart;

  constructor(private cartService: CartService, private router: Router) {}

  ngOnInit(): void {
    this.cart = this.cartService.getCart();
    if (!this.cart.products.length) {
      this.router.navigate(['/']);
    }
  }

  updateCart(product: Product, quantity: number): void {
    this.cart = this.cartService.updateCart(product, quantity);
  }

  remove(id: string): void {
    this.cart = this.cartService.removeFromCart(id);
  }

  clearCart(): void {
    this.cart = this.cartService.clearCart();
  }

  loadCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
