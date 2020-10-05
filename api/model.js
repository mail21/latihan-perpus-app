const knex = require('knex');
// const mysql = require('mysql');
// const koneksi = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'perpustakaan',
// });

// koneksi.connect(() => {
//   console.log('telah berhasil konek db');
// });

const koneksi = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'perpustakaan',
  },
});

module.exports = koneksi;
