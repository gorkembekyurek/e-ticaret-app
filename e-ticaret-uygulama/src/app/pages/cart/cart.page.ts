import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false
})
export class CartPage implements OnInit {
  private cartService = inject(CartService);
  private router = inject(Router);
  cartItems: CartItem[] = [];
  total = 0;

  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal() {
    this.total = this.cartService.getCartTotal();
  }

  updateQuantity(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity);
  }

  removeItem(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }

  checkout() {
    if (this.cartItems.length > 0) {
      this.router.navigate(['/checkout']);
    }
  }

  continueShopping() {
    this.router.navigate(['/tabs/home']);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  }
} 