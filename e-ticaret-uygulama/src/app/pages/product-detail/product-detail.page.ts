import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { FavoritesService } from '../../services/favorites.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: false
})
export class ProductDetailPage implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(CartService);
  private favoritesService = inject(FavoritesService);
  product: Product | undefined;
  quantity = 1;
  isInFavorites = false;

  ngOnInit() {
    const productId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadProduct(productId);
    this.checkFavoriteStatus(productId);
  }

  loadProduct(id: number) {
    this.productService.getProductById(id).subscribe(product => {
      this.product = product;
      this.checkFavoriteStatus(id);
    });
  }

  checkFavoriteStatus(productId: number) {
    this.isInFavorites = this.favoritesService.isInFavorites(productId);
  }

  toggleFavorite() {
    if (this.product) {
      if (this.isInFavorites) {
        this.favoritesService.removeFromFavorites(this.product.id);
      } else {
        this.favoritesService.addToFavorites(this.product);
      }
      this.isInFavorites = !this.isInFavorites;
    }
  }

  increaseQuantity() {
    this.quantity++;
  }

  decreaseQuantity() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart() {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity);
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  }
} 