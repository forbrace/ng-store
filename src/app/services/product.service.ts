import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, throwError, tap } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private DB_URL: string =
    '../../assets';
  private products: Product[] = [];

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${this.DB_URL}/data.json`)
      .pipe(
        map((res) => {
          return [...res];
        }),
        tap((products) => {
          this.products = products;
        }),
        catchError((err) => {
          // send to analytics
          return throwError(err);
        })
      );
  }

  getProducts(): Product[] {
    return this.products;
  }

  productQuantityArray(): number[] {
    return Array.from({ length: 10 }, (_, i) => i + 1); // 10 => [1,2,3,4,5,6,7,8,9,10]
  }
}
