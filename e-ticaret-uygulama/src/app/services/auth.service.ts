import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';
import { HttpClient } from '@angular/common/http';
import { Capacitor } from '@capacitor/core';

export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  addresses?: any[];
  totalOrders?: number;
  favorites?: any[];
  notifications: boolean;
  language?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  // API URL'yi ortama göre ayarla
  private getApiUrl(): string {
    if (Capacitor.isNativePlatform()) {
      // Android/iOS için
      return 'http://10.0.2.2:3001/api';
    } else {
      // Tarayıcı için
      return 'http://localhost:3001/api';
    }
  }

  constructor(private storage: Storage, private http: HttpClient) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    this.checkAuthStatus();
  }

  private async checkAuthStatus() {
    // Önce sessionStorage kontrol et
    const sessionToken = sessionStorage.getItem('authToken');
    const sessionUser = sessionStorage.getItem('currentUser');
    if (sessionToken && sessionUser) {
      this.currentUserSubject.next(JSON.parse(sessionUser));
      this.isAuthenticatedSubject.next(true);
      return;
    }
    // Sonra kalıcı storage kontrol et
    const token = await this.storage.get('authToken');
    const user = await this.storage.get('currentUser');
    if (token && user) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const response: any = await this.http.post(`${this.getApiUrl()}/login`, credentials).toPromise();
      if (response.success && response.user) {
        await this.setAuthData(response.user, 'dummy-token', credentials.rememberMe);
        return { success: true, message: response.message, user: response.user };
      } else {
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      return { success: false, message: err?.error?.message || 'Giriş sırasında hata oluştu.' };
    }
  }

  async register(credentials: RegisterCredentials): Promise<{ success: boolean; message: string; user?: User }> {
    const payload = {
      name: credentials.name,
      email: credentials.email,
      password: credentials.password,
      phone: credentials.phone
    };
    try {
      const response: any = await this.http.post(`${this.getApiUrl()}/register`, payload).toPromise();
      if (response.success && response.user) {
        await this.setAuthData(response.user, 'dummy-token', false);
        return { success: true, message: response.message, user: response.user };
      } else {
        return { success: false, message: response.message };
      }
    } catch (err: any) {
      return { success: false, message: err?.error?.message || 'Kayıt sırasında hata oluştu.' };
    }
  }

  async logout(): Promise<void> {
    await this.storage.remove('authToken');
    await this.storage.remove('currentUser');
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private async setAuthData(user: User, token: string, rememberMe?: boolean) {
    if (rememberMe) {
      await this.storage.set('authToken', token);
      await this.storage.set('currentUser', user);
    } else {
      sessionStorage.setItem('authToken', token);
      sessionStorage.setItem('currentUser', JSON.stringify(user));
      // Storage'dan sil (önceki oturumdan kalma olabilir)
      await this.storage.remove('authToken');
      await this.storage.remove('currentUser');
    }
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    // Önce BehaviorSubject kontrolü
    if (this.isAuthenticatedSubject.value) {
      return true;
    }
    // Sonra sessionStorage kontrolü
    const sessionToken = sessionStorage.getItem('authToken');
    const sessionUser = sessionStorage.getItem('currentUser');
    if (sessionToken && sessionUser) {
      return true;
    }
    // Son olarak storage kontrolü (sadece sync değil, async olduğu için burada await kullanılamaz)
    // Bu yüzden burada sadece hızlıca false döneriz, checkAuthStatus zaten async olarak state'i güncelliyor.
    return false;
  }

  async updateUser(userData: Partial<User>): Promise<void> {
    const currentUser = this.currentUserSubject.value;
    if (currentUser) {
      const updatedUser = { ...currentUser, ...userData };
      await this.storage.set('currentUser', updatedUser);
      this.currentUserSubject.next(updatedUser);
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<{ success: boolean; message: string }> {
    // Simüle edilmiş şifre değiştirme
    return new Promise((resolve) => {
      setTimeout(() => {
        if (currentPassword === '123456') { // Demo şifre
          resolve({ success: true, message: 'Şifre başarıyla değiştirildi' });
        } else {
          resolve({ success: false, message: 'Mevcut şifre hatalı' });
        }
      }, 1000);
    });
  }

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    // Simüle edilmiş şifre sıfırlama
    return new Promise((resolve) => {
      setTimeout(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailRegex.test(email)) {
          resolve({ success: true, message: 'Şifre sıfırlama bağlantısı e-posta adresinize gönderildi' });
        } else {
          resolve({ success: false, message: 'Geçerli bir e-posta adresi giriniz' });
        }
      }, 1000);
    });
  }
} 