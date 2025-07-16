import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from '@ionic/storage-angular';
import { CartItem, User } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private ionicStorage = inject(Storage);
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  private storage: Storage | null = null;
  private currentUser: User | null = null;

  constructor() {
    this.initStorage();
  }

  async initStorage() {
    this.storage = await this.ionicStorage.create();
    await this.loadCartFromStorage();
  }

  private async loadCartFromStorage() {
    if (this.storage) {
      const savedCart = await this.storage.get('cart');
      if (savedCart) {
        this.cartItems = savedCart;
        this.cartSubject.next(this.cartItems);
      }
    }
  }

  private async saveCartToStorage() {
    if (this.storage) {
      await this.storage.set('cart', this.cartItems);
    }
  }

  getCartItems(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }

  getCartItemsValue(): CartItem[] {
    return this.cartItems;
  }

  addToCart(product: Product, quantity: number = 1) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.cartItems.push({ product, quantity });
    }
    
    this.cartSubject.next(this.cartItems);
    this.saveCartToStorage();
  }

  removeFromCart(productId: number) {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.cartSubject.next(this.cartItems);
    this.saveCartToStorage();
  }

  updateQuantity(productId: number, quantity: number) {
    const item = this.cartItems.find(item => item.product.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeFromCart(productId);
      } else {
        item.quantity = quantity;
        this.cartSubject.next(this.cartItems);
        this.saveCartToStorage();
      }
    }
  }

  getCartTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }

  getCartItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    this.saveCartToStorage();
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    return this.currentUser !== null;
  }
} 