import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, catchError, throwError, tap } from 'rxjs';
import { Product } from '../models/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private FIREBASE_DB_URL: string =
    'https://ngstore-ade45-default-rtdb.firebaseio.com/';
  private products: Product[] = [];

  constructor(private http: HttpClient) {}

  fetchProducts(): Observable<Product[]> {
    return this.http
      .get<{ [key: string]: Product }>(`${this.FIREBASE_DB_URL}/products.json`)
      .pipe(
        map((res) => {
          const products: Product[] = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              products.push({ ...res[key], id: key });
            }
          }
          return products;
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
