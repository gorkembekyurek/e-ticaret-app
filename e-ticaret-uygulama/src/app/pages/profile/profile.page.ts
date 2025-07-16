import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { FavoritesService } from '../../services/favorites.service';
import { AuthService, User } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: false
})
export class ProfilePage implements OnInit {
  settingsOpen = false;
  darkMode = false;
  userInfo: User | null = null;
  isAuthenticated = false;

  constructor(
    private alertController: AlertController,
    private toastController: ToastController,
    private router: Router,
    private favoritesService: FavoritesService,
    private authService: AuthService
  ) {
    this.darkMode = localStorage.getItem('darkMode') === 'true';
  }

  ngOnInit() {
    this.checkAuthStatus();
    this.loadFavoritesCount();
  }

  ionViewWillEnter() {
    this.checkAuthStatus();
  }

  private checkAuthStatus() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (this.isAuthenticated) {
      this.userInfo = this.authService.getCurrentUser();
    } else {
      // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
      this.router.navigate(['/login']);
    }
  }

  loadFavoritesCount() {
    if (this.isAuthenticated) {
      this.favoritesService.getFavorites().subscribe(favorites => {
        if (this.userInfo) {
          this.userInfo.favorites = favorites;
        }
      });
    }
  }

  openSettings() {
    this.settingsOpen = true;
  }

  closeSettings() {
    this.settingsOpen = false;
  }

  toggleDarkMode(event: any) {
    this.darkMode = event.detail.checked;
    if (this.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', this.darkMode.toString());
  }

  async toggleNotifications(event: any) {
    if (this.userInfo) {
      this.userInfo.notifications = event.detail.checked;
      await this.authService.updateUser({ notifications: this.userInfo.notifications });
      this.showToast('Bildirim ayarları güncellendi');
    }
  }

  async editProfile() {
    if (!this.userInfo) return;

    const alert = await this.alertController.create({
      header: 'Profili Düzenle',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Ad Soyad',
          value: this.userInfo.name
        },
        {
          name: 'email',
          type: 'email',
          placeholder: 'E-posta',
          value: this.userInfo.email
        },
        {
          name: 'phone',
          type: 'tel',
          placeholder: 'Telefon',
          value: this.userInfo.phone || ''
        }
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel'
        },
        {
          text: 'Kaydet',
          handler: async (data) => {
            if (this.userInfo) {
              this.userInfo.name = data.name;
              this.userInfo.email = data.email;
              this.userInfo.phone = data.phone;
              await this.authService.updateUser({
                name: data.name,
                email: data.email,
                phone: data.phone
              });
              this.showToast('Profil güncellendi');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async showPersonalInfo() {
    if (!this.userInfo) return;

    const alert = await this.alertController.create({
      header: 'Kişisel Bilgiler',
      message: `
        <strong>Ad Soyad:</strong> ${this.userInfo.name}<br>
        <strong>E-posta:</strong> ${this.userInfo.email}<br>
        <strong>Telefon:</strong> ${this.userInfo.phone || 'Belirtilmemiş'}
      `,
      buttons: ['Tamam']
    });
    await alert.present();
  }

  async showAddresses() {
    if (!this.userInfo) return;

    const alert = await this.alertController.create({
      header: 'Adres Bilgileri',
      message: this.userInfo.addresses?.map(addr => 
        `<strong>${addr.title}:</strong><br>${addr.address}`
      ).join('<br><br>') || 'Kayıtlı adres bulunamadı',
      buttons: ['Tamam']
    });
    await alert.present();
  }

  async showOrders() {
    if (!this.userInfo) return;

    const alert = await this.alertController.create({
      header: 'Sipariş Geçmişi',
      message: `Toplam ${this.userInfo.totalOrders || 0} siparişiniz bulunmaktadır.`,
      buttons: ['Tamam']
    });
    await alert.present();
  }

  async showFavorites() {
    // Favoriler sayfasına yönlendir
    this.router.navigate(['/favorites']);
  }

  async showLanguageSettings() {
    if (!this.userInfo) return;

    const alert = await this.alertController.create({
      header: 'Dil Seçimi',
      inputs: [
        {
          type: 'radio',
          label: 'Türkçe',
          value: 'Türkçe',
          checked: this.userInfo.language === 'Türkçe'
        },
        {
          type: 'radio',
          label: 'English',
          value: 'English',
          checked: this.userInfo.language === 'English'
        }
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel'
        },
        {
          text: 'Seç',
          handler: async (data) => {
            if (this.userInfo) {
              this.userInfo.language = data;
              await this.authService.updateUser({ language: data });
              this.showToast('Dil ayarları güncellendi');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  async showSecurity() {
    const alert = await this.alertController.create({
      header: 'Güvenlik',
      message: 'Güvenlik ayarları burada görüntülenecek.',
      buttons: ['Tamam']
    });
    await alert.present();
  }

  async showHelp() {
    const alert = await this.alertController.create({
      header: 'Yardım & Destek',
      message: 'Yardım ve destek bilgileri burada görüntülenecek.',
      buttons: ['Tamam']
    });
    await alert.present();
  }

  async logout() {
    const alert = await this.alertController.create({
      header: 'Çıkış Yap',
      message: 'Hesabınızdan çıkmak istediğinizden emin misiniz?',
      buttons: [
        {
          text: 'İptal',
          role: 'cancel'
        },
        {
          text: 'Çıkış Yap',
          handler: async () => {
            await this.authService.logout();
            this.showToast('Başarıyla çıkış yapıldı');
            this.router.navigate(['/login']);
          }
        }
      ]
    });
    await alert.present();
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    await toast.present();
  }
} 