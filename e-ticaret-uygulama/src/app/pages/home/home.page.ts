import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
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
  private favoritesService = inject(FavoritesService);
  private router = inject(Router);
  products: Product[] = [];
  categories: Category[] = [];
  featuredProducts: Product[] = [];
  cartItemCount = 0;
  favoritesCount = 0;

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.loadFeaturedProducts();
    this.subscribeToCart();
    this.subscribeToFavorites();
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

  subscribeToFavorites() {
    this.favoritesService.getFavorites().subscribe(favorites => {
      this.favoritesCount = this.favoritesService.getFavoritesCount();
    });
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
  }

  toggleFavorite(product: Product) {
    if (this.favoritesService.isInFavorites(product.id)) {
      this.favoritesService.removeFromFavorites(product.id);
    } else {
      this.favoritesService.addToFavorites(product);
    }
  }

  isInFavorites(productId: number): boolean {
    return this.favoritesService.isInFavorites(productId);
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  viewCategory(category: string) {
    this.router.navigate(['/tabs/categories'], { queryParams: { category } });
  }

  viewFavorites() {
    this.router.navigate(['/favorites']);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  }
} 