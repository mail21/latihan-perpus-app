module.exports = (app) => {
  // http://localhost:3001/
  const controller = require('./controller');

  app.get('/', (req, res) => {
    res.send(`
        - /getBuku <br>
        - /getAnggota <br>
        - /getPetugas <br>
        - /getLokasi <br>
        - /getTransaksi <br>
    `);
  });

  app.get('/getBuku', controller.get.getBuku);
  app.get('/getTransaksi', controller.get.getTransaksi);
  app.get('/getAnggota', controller.get.getAnggota);
  app.get('/getPetugas', controller.get.getPetugas);
  app.get('/getLokasi', controller.get.getLokasi);
  app.post('/addBuku', controller.post.addBuku);
  app.post('/addTransaksiPeminjaman', controller.post.addTransaksiPeminjaman);
  app.post('/addTransaksiPengembalian', controller.post.addTransaksiPengembalian);
  app.delete('/deleteBuku/:id', controller.delete.deleteBuku);
};
