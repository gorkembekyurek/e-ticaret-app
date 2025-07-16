import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone: false
})
export class TabsPage implements OnInit {
  private cartService = inject(CartService);
  cartItemCount = 0;

  ngOnInit() {
    this.subscribeToCart();
  }

  subscribeToCart() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }
} 