const fs = require('fs');
const path = require('path');

// Icon sizes for Android
const iconSizes = {
  'mipmap-mdpi': 48,
  'mipmap-hdpi': 72,
  'mipmap-xhdpi': 96,
  'mipmap-xxhdpi': 144,
  'mipmap-xxxhdpi': 192
};

console.log('E-ticaret uygulaması için PNG ikonları oluşturuluyor...');
console.log('Tema rengi: #3880ff (Mavi)');

console.log('\nPNG ikonları oluşturmak için:');
console.log('1. create-simple-icon.html dosyasını tarayıcıda açın');
console.log('2. Her boyut için "İkonu İndir" butonuna tıklayın');
console.log('3. İndirilen dosyaları şu klasörlere kopyalayın:');

Object.entries(iconSizes).forEach(([folder, size]) => {
  console.log(`   - ${folder}/ic_launcher.png (${size}x${size}px)`);
});

console.log('\nAlternatif olarak:');
console.log('1. icon-preview.html dosyasını tarayıcıda açın');
console.log('2. İkonları ekran görüntüsü alın');
console.log('3. Online araçlarla PNG formatına dönüştürün');
console.log('4. Android Studio\'da ilgili mipmap klasörlerine kopyalayın');

console.log('\nÖnemli:');
console.log('- Adaptive icon sistemini devre dışı bıraktık');
console.log('- Artık sadece PNG ikonları kullanılacak');
console.log('- Uygulamayı yeniden derleyin ve virtual device\'da test edin'); 