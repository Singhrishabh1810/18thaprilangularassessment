import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private url = 'assets/db.json';
  private products: Product[] | null = null;
  private readonly STORAGE_KEY = 'app_products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {

    if (this.products !== null) {
      return of(this.products);
    }


    const stored = localStorage.getItem(this.STORAGE_KEY);
    if (stored) {
      this.products = JSON.parse(stored);
      return of(this.products!);
    }


    return this.http.get<Product[]>(this.url).pipe(
      tap(data => {
        this.products = data;
        this.saveToStorage();
      })
    );
  }

  deleteProduct(pid: number): void {
    if (this.products) {
      this.products = this.products.filter(p => p.pid !== pid);
      this.saveToStorage();
    }
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.products));
  }
}
