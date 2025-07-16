# E-Ticaret Uygulama İkonu

Bu klasörde uygulamanızın tema renklerine uygun modern bir ikon oluşturulmuştur.

## 🎨 Tema Renkleri

- **Primary Color**: `#3880ff` (Mavi)
- **Secondary Colors**: 
  - `#eb445a` (Kırmızı)
  - `#2dd36f` (Yeşil) 
  - `#ffc409` (Sarı/Turuncu)
  - `#92949c` (Gri)

## 📱 İkon Tasarımı

İkon, e-ticaret temasına uygun olarak tasarlanmıştır:
- **Alışveriş Çantası**: Ana simge olarak kullanılmış
- **Renkli Ürünler**: Sepet içinde uygulamanın tema renklerini yansıtan ürünler
- **"E" Harfi**: E-ticaret temasını vurgulayan harf
- **Modern Gradient**: Mavi tonlarında gradient arka plan

## 🛠️ Kurulum

### 1. İkon Önizleme
`icon-preview.html` dosyasını tarayıcıda açarak ikonu görüntüleyebilirsiniz.

### 2. PNG İkonları Oluşturma
SVG'den PNG'ye dönüştürmek için:

#### Online Araçlar:
- [Convertio](https://convertio.co/svg-png/)
- [CloudConvert](https://cloudconvert.com/svg-to-png)
- [SVG to PNG](https://svgtopng.com/)

#### Gerekli Boyutlar:
```
mipmap-mdpi: 48x48px
mipmap-hdpi: 72x72px  
mipmap-xhdpi: 96x96px
mipmap-xxhdpi: 144x144px
mipmap-xxxhdpi: 192x192px
```

### 3. Android Studio'ya Yükleme

1. PNG dosyalarını oluşturduktan sonra
2. `android/app/src/main/res/` klasörüne gidin
3. İlgili `mipmap-*` klasörlerine kopyalayın:
   - `ic_launcher.png`
   - `ic_launcher_round.png` (yuvarlak versiyon)

### 4. Adaptive Icon (Android 8.0+)

Adaptive icon dosyaları zaten oluşturulmuştur:
- `mipmap-anydpi-v26/ic_launcher.xml`
- `mipmap-anydpi-v26/ic_launcher_round.xml`
- `drawable/ic_launcher_foreground.xml`
- `values/ic_launcher_background.xml`

## 🎯 Özellikler

- ✅ Uygulamanın tema renklerine uygun
- ✅ Modern ve profesyonel tasarım
- ✅ E-ticaret temasını yansıtıyor
- ✅ Farklı ekran yoğunlukları için optimize
- ✅ Android adaptive icon desteği
- ✅ Yuvarlak ve kare versiyonlar

## 🔄 Güncelleme

İkonu değiştirmek isterseniz:
1. `app-icon.svg` dosyasını düzenleyin
2. PNG versiyonlarını yeniden oluşturun
3. Android klasörlerine kopyalayın
4. Uygulamayı yeniden derleyin

## 📝 Notlar

- İkon, uygulamanızın mavi tema rengini (`#3880ff`) kullanır
- Alışveriş çantası ve sepet tasarımı e-ticaret temasını güçlendirir
- Renkli ürünler uygulamanın çeşitliliğini gösterir
- "E" harfi e-ticaret kimliğini vurgular

---

**Oluşturulma Tarihi**: $(date)
**Tema Renkleri**: Uygulama CSS'inden otomatik çıkarılmıştır 