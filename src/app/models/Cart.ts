import { CartProduct } from './Product';

export class Cart {
  products: CartProduct[];
  totalPrice: number;

  constructor() {
    this.products = [];
    this.totalPrice = 0;
  }
}
