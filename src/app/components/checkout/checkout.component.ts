import { Component, OnInit } from '@angular/core';
import { CheckoutService } from '../../services/checkout.service';
import { CartService } from '../../services/cart.service';
import { Country } from '../../models/Country';
import { Cart } from '../../models/Cart';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import { User } from '../../models/User';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  fullName: string = '';
  email: string = '';
  address: string = '';
  zipCode: string = '';
  countries: Country[] = [];
  country: Country = { name: 'United States', code: 'US' };
  cart: Cart = {} as Cart;
  ccNumber: string = '';
  ccCode: string = '';
  ccExpireMonth: string = '';
  ccExpireYear: string = '';
  user: User = {} as User;

  constructor(
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.checkoutService.getCountries().subscribe((res) => {
      this.countries = res;
    });
    this.cart = this.cartService.getCart();
    if (!this.cart.products.length) {
      this.router.navigate(['/']);
    }
  }

  onSubmit(): void {
    // 1. create user
    this.userService.setUser({
      fullName: this.fullName,
      email: this.email,
      address: this.address,
      zipCode: this.zipCode,
      country: this.country,
    });

    // 2. create an order
    this.orderService.setOrder({
      status: 'pending',
      products: this.cart.products,
      totalPrice: this.cart.totalPrice,
    });

    // 3. clear cart
    this.cartService.clearCart();

    // 4. load confirmation
    this.loadConfirmation();
  }

  private loadConfirmation(): void {
    this.router.navigate(['/confirmation']);
  }
}
