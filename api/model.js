const mysql = require('mysql');
const koneksi = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'perpustakaan',
});

koneksi.connect(() => {
  console.log('telah berhasil konek db');
});

module.exports = koneksi;
