import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ProductService } from '../../../../services/product.service';
import { Product } from '../../../../models/Product';
import { CartService } from '../../../../services/cart.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss'],
})
export class ProductItemDetailComponent implements OnInit {
  id: string = '';
  product: Product = {} as Product;
  quantity: number = 1;
  maxQuantity: number[] = [];
  loading: boolean = false;
  errorResponse: HttpErrorResponse | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.fetchProduct(this.id);
    this.maxQuantity = this.productService.productQuantityArray();
  }

  addToCart(product: Product, quantity: number): void {
    this.cartService.addToCart(product, +quantity);
  }

  fetchProduct(id: string): void {
    if (this.productService.getProducts().length) {
      this.product = this.getProduct(this.productService.getProducts(), id);
      if (!this.product.id) {
        this.router.navigate(['/']);
      }
    } else {
      this.loading = true;
      this.productService.fetchProducts().subscribe(
        (products) => {
          this.product = this.getProduct(products, id);
          this.loading = false;
          if (!this.product.id) {
            this.router.navigate(['/']);
          }
        },
        (error) => {
          console.log(error);
          this.errorResponse = error;
          this.loading = false;
        }
      );
    }
  }

  private getProduct(products: Product[], id: string) {
    return products.find((product) => product.id === id) || ({} as Product);
  }
}
