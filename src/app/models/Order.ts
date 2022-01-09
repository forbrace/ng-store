import { CartProduct } from './Product';

export class Order {
  products: CartProduct[];
  status: string;
  totalPrice: number;

  constructor() {
    this.products = [];
    this.status = '';
    this.totalPrice = 0;
  }
}
