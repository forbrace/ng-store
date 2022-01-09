import { Component, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  // TODO: session storage?
  cartItems: number = 0;
  private productCounterChangedSub: Subscription | undefined;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.productCounterChangedSub =
      this.cartService.productCounterEmitter.subscribe((counter) => {
        this.cartItems = counter;
      });
  }

  ngOnDestroy(): void {
    this.productCounterChangedSub?.unsubscribe();
  }
}
