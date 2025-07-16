# E-Ticaret Uygulaması

Bu proje, Ionic Framework kullanılarak geliştirilmiş modern bir e-ticaret mobil uygulamasıdır.

## Özellikler

### 🛍️ Ana Özellikler
- **Ürün Kataloğu**: Kategorilere ayrılmış ürün listesi
- **Ürün Detayları**: Detaylı ürün bilgileri ve görselleri
- **Alışveriş Sepeti**: Ürün ekleme, çıkarma ve miktar güncelleme
- **Kategori Filtreleme**: Kategoriye göre ürün filtreleme
- **Arama**: Ürün arama özelliği (yakında)
- **Profil Yönetimi**: Kullanıcı profili (yakında)
- **Sipariş Takibi**: Sipariş geçmişi (yakında)

### 🎨 Tasarım Özellikleri
- Modern ve kullanıcı dostu arayüz
- Responsive tasarım
- Smooth animasyonlar
- Material Design prensipleri
- Türkçe dil desteği

### 💾 Veri Yönetimi
- Local Storage ile sepet verilerinin saklanması
- Observable pattern ile reactive veri akışı
- Service-based architecture

## Teknolojiler

- **Ionic Framework**: Cross-platform mobil uygulama geliştirme
- **Angular**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **Ionic Storage**: Local data persistence
- **Ionic Components**: UI bileşenleri

## Kurulum

### Gereksinimler
- Node.js (v16 veya üzeri)
- npm veya yarn
- Ionic CLI

### Adımlar

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd e-ticaret-uygulama
```

2. **Bağımlılıkları yükleyin**
```bash
npm install
```

3. **Uygulamayı çalıştırın**
```bash
npm start
```

4. **Tarayıcıda açın**
```
http://localhost:4200
```

## Proje Yapısı

```
src/
├── app/
│   ├── models/           # Veri modelleri
│   ├── services/         # Business logic servisleri
│   ├── pages/           # Sayfa bileşenleri
│   │   ├── home/        # Ana sayfa
│   │   ├── cart/        # Sepet sayfası
│   │   ├── categories/  # Kategoriler
│   │   ├── search/      # Arama
│   │   ├── profile/     # Profil
│   │   ├── checkout/    # Ödeme
│   │   └── orders/      # Siparişler
│   └── tabs/            # Tab navigasyonu
├── assets/              # Statik dosyalar
└── theme/               # Tema dosyaları
```

## Kullanım

### Ana Sayfa
- Öne çıkan ürünler
- Kategori listesi
- Tüm ürünler grid görünümü

### Ürün Detayı
- Ürün görselleri
- Fiyat bilgileri
- Ürün açıklaması
- Sepete ekleme

### Sepet
- Ürün listesi
- Miktar güncelleme
- Toplam hesaplama
- Ödemeye geçiş

## Geliştirme

### Yeni Sayfa Ekleme
1. `src/app/pages/` altında yeni klasör oluşturun
2. Component, template ve style dosyalarını ekleyin
3. Routing modülünü oluşturun
4. Ana routing'e ekleyin

### Yeni Servis Ekleme
1. `src/app/services/` altında servis dosyası oluşturun
2. Injectable decorator ekleyin
3. Gerekli metodları implement edin

### Stil Güncelleme
- Global stiller: `src/global.scss`
- Sayfa stilleri: İlgili sayfa klasöründeki `.scss` dosyası
- Tema: `src/theme/` klasörü

## Özellikler

### Mevcut Özellikler
- ✅ Ürün listesi
- ✅ Ürün detayları
- ✅ Sepet yönetimi
- ✅ Kategori filtreleme
- ✅ Local storage
- ✅ Responsive tasarım

### Gelecek Özellikler
- 🔄 Kullanıcı girişi
- 🔄 Ödeme sistemi
- 🔄 Sipariş takibi
- 🔄 Push notifications
- 🔄 Offline mod
- 🔄 Çoklu dil desteği

## Katkıda Bulunma

1. Fork yapın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit yapın (`git commit -m 'Add amazing feature'`)
4. Push yapın (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır.

## İletişim

Proje Sahibi - [@yourusername](https://github.com/yourusername)

Proje Linki: [https://github.com/yourusername/e-ticaret-uygulama](https://github.com/yourusername/e-ticaret-uygulama) 