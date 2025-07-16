import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { Product, Category } from '../../models/product.model';
import { CartItem } from '../../models/cart.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: false
})
export class HomePage implements OnInit {
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private router = inject(Router);
  products: Product[] = [];
  categories: Category[] = [];
  featuredProducts: Product[] = [];
  cartItemCount = 0;

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.loadFeaturedProducts();
    this.subscribeToCart();
  }

  loadProducts() {
    this.productService.getProducts().subscribe(products => {
      this.products = products;
    });
  }

  loadCategories() {
    this.productService.getCategories().subscribe(categories => {
      this.categories = categories;
    });
  }

  loadFeaturedProducts() {
    this.productService.getFeaturedProducts().subscribe(products => {
      this.featuredProducts = products;
    });
  }

  subscribeToCart() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItemCount = this.cartService.getCartItemCount();
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  viewCategory(category: string) {
    this.router.navigate(['/tabs/categories'], { queryParams: { category } });
  }

  viewCart() {
    this.router.navigate(['/cart']);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  }
} 