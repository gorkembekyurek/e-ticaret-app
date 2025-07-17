import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  showPassword = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe: [false]
    });
  }

  ngOnInit() {
    // Otomatik yönlendirme kaldırıldı. Sadece login sonrası yönlendirme yapılacak.
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      const loading = await this.loadingController.create({
        message: 'Giriş yapılıyor...',
        spinner: 'crescent'
      });
      await loading.present();

      try {
        const { email, password, rememberMe } = this.loginForm.value;
        const result = await this.authService.login({ email, password, rememberMe });
        if (result.success) {
          await this.showToast(result.message, 'success');
          setTimeout(() => {
            this.router.navigate(['/tabs/home']);
          }, 0);
        } else {
          await this.showToast(result.message, 'danger');
        }
      } catch (error) {
        await this.showToast('Bir hata oluştu. Lütfen tekrar deneyin.', 'danger');
      } finally {
        this.isLoading = false;
        await loading.dismiss();
      }
    } else {
      this.markFormGroupTouched();
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  async forgotPassword() {
    const alert = await this.alertController.create({
      header: 'Şifremi Unuttum',
      message: 'E-posta adresinizi girin, şifre sıfırlama bağlantısı göndereceğiz.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'E-posta adresiniz',
          attributes: {
            required: true
          }
        }
      ],
      buttons: [
        {
          text: 'İptal',
          role: 'cancel'
        },
        {
          text: 'Gönder',
          handler: async (data) => {
            if (data.email) {
              const result = await this.authService.forgotPassword(data.email);
              await this.showToast(result.message, result.success ? 'success' : 'danger');
            }
          }
        }
      ]
    });
    await alert.present();
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }

  async showDemoCredentials() {
    const alert = await this.alertController.create({
      header: 'Demo Bilgileri',
      message: `
        <strong>E-posta:</strong> demo@example.com<br>
        <strong>Şifre:</strong> 123456
      `,
      buttons: ['Tamam']
    });
    await alert.present();
  }

  private markFormGroupTouched() {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      control?.markAsTouched();
    });
  }

  private async showToast(message: string, color: string = 'primary') {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000,
      color: color,
      position: 'top'
    });
    await toast.present();
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
} 