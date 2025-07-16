import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';
import { Storage } from '@ionic/storage-angular';

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

  constructor(private storage: Storage) {
    this.initStorage();
  }

  private async initStorage() {
    await this.storage.create();
    this.checkAuthStatus();
  }

  private async checkAuthStatus() {
    const token = await this.storage.get('authToken');
    const user = await this.storage.get('currentUser');
    
    if (token && user) {
      this.currentUserSubject.next(user);
      this.isAuthenticatedSubject.next(true);
    }
  }

  async login(credentials: LoginCredentials): Promise<{ success: boolean; message: string; user?: User }> {
    // Simüle edilmiş API çağrısı
    return new Promise((resolve) => {
      setTimeout(() => {
        // Demo kullanıcı kontrolü
        if (credentials.email === 'demo@example.com' && credentials.password === '123456') {
          const user: User = {
            id: 1,
            name: 'Demo Kullanıcı',
            email: credentials.email,
            phone: '+90 555 123 4567',
            addresses: [
              { id: 1, title: 'Ev', address: 'Örnek Mahallesi, Örnek Sokak No:1, İstanbul' },
              { id: 2, title: 'İş', address: 'İş Mahallesi, İş Sokak No:5, Ankara' }
            ],
            totalOrders: 12,
            notifications: true,
            language: 'Türkçe'
          };

          this.setAuthData(user, 'demo-token-123');
          resolve({ success: true, message: 'Giriş başarılı', user });
        } else {
          resolve({ success: false, message: 'E-posta veya şifre hatalı' });
        }
      }, 1000);
    });
  }

  async register(credentials: RegisterCredentials): Promise<{ success: boolean; message: string; user?: User }> {
    // Simüle edilmiş API çağrısı
    return new Promise((resolve) => {
      setTimeout(() => {
        // Şifre kontrolü
        if (credentials.password !== credentials.confirmPassword) {
          resolve({ success: false, message: 'Şifreler eşleşmiyor' });
          return;
        }

        // E-posta format kontrolü
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(credentials.email)) {
          resolve({ success: false, message: 'Geçerli bir e-posta adresi giriniz' });
          return;
        }

        // Şifre güvenlik kontrolü
        if (credentials.password.length < 6) {
          resolve({ success: false, message: 'Şifre en az 6 karakter olmalıdır' });
          return;
        }

        const user: User = {
          id: Date.now(), // Basit ID oluşturma
          name: credentials.name,
          email: credentials.email,
          phone: credentials.phone,
          addresses: [],
          totalOrders: 0,
          notifications: true,
          language: 'Türkçe'
        };

        this.setAuthData(user, 'new-user-token-' + Date.now());
        resolve({ success: true, message: 'Kayıt başarılı', user });
      }, 1000);
    });
  }

  async logout(): Promise<void> {
    await this.storage.remove('authToken');
    await this.storage.remove('currentUser');
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  private async setAuthData(user: User, token: string) {
    await this.storage.set('authToken', token);
    await this.storage.set('currentUser', user);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
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