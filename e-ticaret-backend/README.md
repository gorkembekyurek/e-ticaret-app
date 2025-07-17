# E-Ticaret Backend (Node.js + Express + SQLite)

## Kurulum

1. Gerekli paketleri yükle:
   ```bash
   npm install
   ```

2. Sunucuyu başlat:
   ```bash
   node server.js
   ```

3. API http://localhost:3001 adresinde çalışır.

## API Endpointleri

### Kayıt Ol (Register)
- **POST** `/api/register`
- Body:
  ```json
  {
    "name": "Ad Soyad",
    "email": "mail@example.com",
    "password": "şifre",
    "phone": "555..." // opsiyonel
  }
  ```
- Yanıt:
  - Başarılı: `{ success: true, message: 'Kayıt başarılı.', user: { ... } }`
  - Hata: `{ success: false, message: '...' }`

### Giriş Yap (Login)
- **POST** `/api/login`
- Body:
  ```json
  {
    "email": "mail@example.com",
    "password": "şifre"
  }
  ```
- Yanıt:
  - Başarılı: `{ success: true, message: 'Giriş başarılı.', user: { ... } }`
  - Hata: `{ success: false, message: '...' }`

## Notlar
- Şifreler şu an için düz metin olarak saklanıyor. Gerçek projede hash kullanılmalı.
- Veritabanı dosyası: `users.db` bu klasörde oluşur. 