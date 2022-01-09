import { Injectable } from '@angular/core';
import { Order } from '../models/Order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  order: Order = {} as Order;

  constructor() {}

  getOrder(): Order {
    return this.order;
  }

  setOrder(order: Order): Order {
    // TODO: create DB order
    this.order = order;
    return this.order;
  }
}
