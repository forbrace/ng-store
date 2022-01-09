import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { UserService } from '../../services/user.service';
import { Order } from '../../models/Order';
import { User } from '../../models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  order: Order = {} as Order;
  user: User = {} as User;

  constructor(
    private orderService: OrderService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.order = this.orderService.getOrder();
    if (!Object.keys(this.order).length) {
      this.router.navigate(['/']);
    }
  }
}
