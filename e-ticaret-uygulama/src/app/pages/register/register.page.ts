import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isLoading = false;
  acceptTerms = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private loadingController: LoadingController,
    private toastController: ToastController,
    private alertController: AlertController
  ) {
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.pattern(/^[0-9+\-\s()]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  ngOnInit() {
    // Eğer kullanıcı zaten giriş yapmışsa ana sayfaya yönlendir
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/tabs/home']);
    }
  }

  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  async onSubmit() {
    if (this.registerForm.valid && this.acceptTerms) {
      this.isLoading = true;
      const loading = await this.loadingController.create({
        message: 'Hesap oluşturuluyor...',
        spinner: 'crescent'
      });
      await loading.present();

      try {
        const result = await this.authService.register(this.registerForm.value);
        
        if (result.success) {
          await this.showToast(result.message, 'success');
          this.router.navigate(['/tabs/home']);
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
      if (!this.acceptTerms) {
        await this.showToast('Kullanım şartlarını kabul etmelisiniz.', 'warning');
      }
    }
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPasswordVisibility() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  async showTerms() {
    const alert = await this.alertController.create({
      header: 'Kullanım Şartları',
      message: `
        <div style="text-align: left; max-height: 300px; overflow-y: auto;">
          <h4>1. Genel Hükümler</h4>
          <p>Bu uygulamayı kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.</p>
          
          <h4>2. Kişisel Veriler</h4>
          <p>Kişisel verileriniz gizlilik politikamıza uygun olarak işlenecektir.</p>
          
          <h4>3. Kullanım Koşulları</h4>
          <p>Uygulamayı yasal amaçlar için kullanmayı kabul edersiniz.</p>
          
          <h4>4. Sorumluluk</h4>
          <p>Hesabınızın güvenliğinden siz sorumlusunuz.</p>
          
          <h4>5. Değişiklikler</h4>
          <p>Bu şartlar önceden haber verilmeksizin değiştirilebilir.</p>
        </div>
      `,
      buttons: ['Anladım']
    });
    await alert.present();
  }

  private markFormGroupTouched() {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
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

  get name() {
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get phone() {
    return this.registerForm.get('phone');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  get passwordMismatch() {
    return this.registerForm.errors?.['passwordMismatch'];
  }
} 