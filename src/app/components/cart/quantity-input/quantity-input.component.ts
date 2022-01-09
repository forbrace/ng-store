import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CartProduct, Product } from '../../../models/Product';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-input.component.html',
  styleUrls: ['./quantity-input.component.scss']
})
export class QuantityInputComponent implements OnInit {
  @Input() product: CartProduct = {} as CartProduct;
  @Input() index: number = 0;
  @Output() onQuantityChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  quantityChange(quantity: number) {
    this.onQuantityChange.emit(quantity);
  }

  setMinProductQuantity(product: CartProduct): void {
    if (!product.quantity || product.quantity < 1) {
      product.quantity = 1;
    }
  }

}
