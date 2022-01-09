import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../../models/Product';
import { CartService } from '../../../services/cart.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  quantity: number = 1;
  maxQuantity: number[] = [];

  @Input() product: Product = {} as Product;

  constructor(
    private cartService: CartService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.maxQuantity = this.productService.productQuantityArray();
  }

  addToCart(product: Product, quantity: number): void {
    this.cartService.addToCart(product, +quantity);
  }
}
