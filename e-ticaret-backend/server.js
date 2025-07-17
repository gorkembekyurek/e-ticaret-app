const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// SQLite DB
const dbPath = path.resolve(__dirname, 'users.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Veritabanı bağlantı hatası:', err.message);
  } else {
    console.log('SQLite veritabanına bağlanıldı.');
  }
});

// Kullanıcı tablosu oluştur
const createUserTable = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  phone TEXT
);
`;
db.run(createUserTable);

// Register endpoint
app.post('/api/register', (req, res) => {
  console.log('Register isteği:', req.body); // Gelen veriyi logla
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ success: false, message: 'Eksik bilgi.' });
  }
  const query = 'INSERT INTO users (name, email, password, phone) VALUES (?, ?, ?, ?)';
  db.run(query, [name, email, password, phone], function (err) {
    if (err) {
      console.error('DB Hatası:', err); // DB hatasını logla
      if (err.message.includes('UNIQUE')) {
        return res.status(409).json({ success: false, message: 'Bu e-posta ile kayıtlı bir kullanıcı var.' });
      }
      return res.status(500).json({ success: false, message: 'Kayıt sırasında hata oluştu.' });
    }
    res.json({ success: true, message: 'Kayıt başarılı.', user: { id: this.lastID, name, email, phone } });
  });
});

// Login endpoint
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Eksik bilgi.' });
  }
  const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.get(query, [email, password], (err, user) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Giriş sırasında hata oluştu.' });
    }
    if (!user) {
      return res.status(401).json({ success: false, message: 'E-posta veya şifre hatalı.' });
    }
    res.json({ success: true, message: 'Giriş başarılı.', user: { id: user.id, name: user.name, email: user.email, phone: user.phone } });
  });
});

// Sunucuyu başlat
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend API http://localhost:${PORT} adresinde çalışıyor.`);
}); 