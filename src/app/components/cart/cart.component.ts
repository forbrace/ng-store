import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartProduct, Product } from '../../models/Product';
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

  remove(product: Product): void {
    this.cartService.removeFromCart(product);
    this.cart = this.cartService.getCart();
    setTimeout(() => alert('The product was removed from cart!'), 500);
  }

  clearCart(): void {
    this.cart = this.cartService.clearCart();
    setTimeout(() => alert('All products were removed from cart!'), 500);
  }

  loadCheckout(): void {
    this.router.navigate(['/checkout']);
  }
}
