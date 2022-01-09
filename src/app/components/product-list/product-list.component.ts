import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/Product';
import { ProductService } from '../../services/product.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  isFetching: boolean = false;
  errorResponse: HttpErrorResponse | undefined;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.fetchProducts();
  }

  fetchProducts() {
    if (this.productService.getProducts().length) {
      this.products = this.productService.getProducts();
    } else {
      this.isFetching = true;
      this.productService.fetchProducts().subscribe(
        (products) => {
          this.products = [...products];
          this.isFetching = false;
        },
        (error) => {
          console.log(error);
          this.errorResponse = error;
          this.isFetching = false;
        }
      );
    }
  }
}
