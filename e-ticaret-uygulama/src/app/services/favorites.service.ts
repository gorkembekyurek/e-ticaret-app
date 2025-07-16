import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favoritesSubject = new BehaviorSubject<Product[]>([]);
  private favorites: Product[] = [];

  constructor(private productService: ProductService) {
    this.loadFavoritesFromStorage();
    this.initializeSampleFavorites();
  }

  getFavorites(): Observable<Product[]> {
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
    return this.favorites.length;
  }

  private updateFavorites(): void {
    this.favoritesSubject.next([...this.favorites]);
    this.saveFavoritesToStorage();
  }

  private saveFavoritesToStorage(): void {
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  private loadFavoritesFromStorage(): void {
    const stored = localStorage.getItem('favorites');
    if (stored) {
      this.favorites = JSON.parse(stored);
      this.favoritesSubject.next([...this.favorites]);
    }
  }

  private initializeSampleFavorites(): void {
    // Eğer localStorage'da favori yoksa, örnek ürünler ekle
    if (this.favorites.length === 0) {
      this.productService.getProducts().subscribe(products => {
        // İlk 3 ürünü favorilere ekle
        const sampleProducts = products.slice(0, 3);
        this.favorites = sampleProducts;
        this.updateFavorites();
      });
    }
  }
} 