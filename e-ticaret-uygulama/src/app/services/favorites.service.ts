import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Product[]>([]);
  private favorites: Product[] = [];

  constructor(private productService: ProductService, private authService: AuthService) {
    this.loadFavoritesFromStorage();
    this.initializeSampleFavorites();
  }

  getFavorites(): Observable<Product[]> {
    this.loadFavoritesFromStorage(); // Kullanıcı değişirse güncel favoriler gelsin
    return this.favoritesSubject.asObservable();
  }

  addToFavorites(product: Product): void {
    if (!this.isInFavorites(product.id)) {
      this.favorites.push(product);
      this.updateFavorites();
    }
  }

  removeFromFavorites(productId: number): void {
    this.favorites = this.favorites.filter(p => p.id !== productId);
    this.updateFavorites();
  }

  isInFavorites(productId: number): boolean {
    return this.favorites.some(p => p.id === productId);
  }

  getFavoritesCount(): number {
    this.loadFavoritesFromStorage();
    return this.favorites.length;
  }

  private updateFavorites(): void {
    this.favoritesSubject.next([...this.favorites]);
    this.saveFavoritesToStorage();
  }

  private getStorageKey(): string {
    const user = this.authService.getCurrentUser();
    if (user && user.email) {
      return `favorites_${user.email}`;
    }
    return 'favorites_guest';
  }

  private saveFavoritesToStorage(): void {
    localStorage.setItem(this.getStorageKey(), JSON.stringify(this.favorites));
  }

  private loadFavoritesFromStorage(): void {
    const stored = localStorage.getItem(this.getStorageKey());
    if (stored) {
      this.favorites = JSON.parse(stored);
      this.favoritesSubject.next([...this.favorites]);
    } else {
      this.favorites = [];
      this.favoritesSubject.next([]);
    }
  }

  private initializeSampleFavorites(): void {
    if (this.favorites.length === 0) {
      this.productService.getProducts().subscribe(products => {
        const sampleProducts = products.slice(0, 3);
        this.favorites = sampleProducts;
        this.updateFavorites();
      });
    }
  }
} 