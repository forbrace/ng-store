export class Product {
  id: string;
  name: string;
  price: number;
  url: string;
  description: string;

  constructor() {
    this.id = '';
    this.name = '';
    this.price = 0;
    this.url = '';
    this.description = '';
  }
}

export class CartProduct {
  id: string;
  name: string;
  price: number;
  url: string;
  description: string;
  quantity: number;

  constructor() {
    this.id = '';
    this.name = '';
    this.price = 0;
    this.url = '';
    this.description = '';
    this.quantity = 0;
  }
}
