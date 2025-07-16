import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { FavoritesService } from '../../services/favorites.service';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
  standalone: false
})
export class FavoritesPage implements OnInit {
  private favoritesService = inject(FavoritesService);
  private cartService = inject(CartService);
  private router = inject(Router);
  private alertController = inject(AlertController);
  private toastController = inject(ToastController);
  
  favorites: Product[] = [];

  ngOnInit() {
    this.loadFavorites();
  }

  loadFavorites() {
    this.favoritesService.getFavorites().subscribe(favorites => {
      this.favorites = favorites;
    });
  }

  removeFromFavorites(productId: number) {
    this.favoritesService.removeFromFavorites(productId);
    this.showToast('Ürün favorilerden kaldırıldı');
  }

  async clearAllFavorites() {
    const alert = await this.alertController.create({
      header: 'Tüm Favorileri Temizle',
      message: 'Tüm favori ürünlerinizi kaldırmak istediğinizden emin misiniz?',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel'
        },
        {
          text: 'Temizle',
          handler: () => {
            this.favorites.forEach(product => {
              this.favoritesService.removeFromFavorites(product.id);
            });
            this.showToast('Tüm favoriler temizlendi');
          }
        }
      ]
    });
    await alert.present();
  }

  addToCart(product: Product) {
    this.cartService.addToCart(product);
    this.showToast('Ürün sepete eklendi');
  }

  viewProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  goToHome() {
    this.router.navigate(['/tabs/home']);
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY'
    }).format(price);
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });
    await toast.present();
  }
} 