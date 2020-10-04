module.exports = (app) => {
  // http://localhost:3000/
  const controller = require('./controller');

  app.get('/', (req, res) => {
    res.send(`
        - /getBuku <br>
        - /getAnggota <br>
        - /getPetugas <br>
        - /getLokasi <br>
    `);
  });

  app.get('/getBuku', controller.get.getBuku);
  app.get('/getAnggota', controller.get.getAnggota);
  app.get('/getPetugas', controller.get.getPetugas);
  app.get('/getLokasi', controller.get.getLokasi);
};
