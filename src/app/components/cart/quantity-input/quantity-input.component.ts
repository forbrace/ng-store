import { Component, EventEmitter, Input, OnInit, Output, ViewRef } from '@angular/core';
import { CartProduct, Product } from '../../../models/Product';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-quantity-selector',
  templateUrl: './quantity-input.component.html',
  styleUrls: ['./quantity-input.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
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
    if (product.quantity && product.quantity > 0) {
      return;
    }
    product.quantity = 1;
  }

}
