const db = require('./model');

module.exports = {
  get: {
    getBuku: (req, res) => {
      db.query('SELECT * FROM buku', (err, result) => {
        if (err) console.log(err);
        res.json(result);
      });
    },
    getAnggota: (req, res) => {
      db.query('SELECT * FROM anggota', (err, result) => {
        if (err) console.log(err);
        res.json(result);
      });
    },
    getPetugas: (req, res) => {
      db.query('SELECT * FROM petugas', (err, result) => {
        if (err) console.log(err);
        res.json(result);
      });
    },
    getLokasi: (req, res) => {
      db.query('SELECT * FROM lokasi', (err, result) => {
        if (err) console.log(err);
        res.json(result);
      });
    },
  },
  post: {
    addBuku: (req, res) => {
      // db.query("INSERT INTO buku VALUES(?,?,?,?,?)",[])
    },
  },
};
