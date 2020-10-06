const table = require('./model');

module.exports = {
  get: {
    getBuku: async (req, res) => {
      const query = table.select('*').from('buku');
      const result = await query.then((data) => data);
      res.json(result);
    },
    getAnggota: async (req, res) => {
      const query = table.select('*').from('anggota');
      const result = await query.then((data) => data);
      res.json(result);
    },
    getPetugas: async (req, res) => {
      const query = table.select('*').from('petugas');
      const result = await query.then((data) => data);
      res.json(result);
    },
    getLokasi: async (req, res) => {
      const query = table.select('*').from('lokasi');
      const result = await query.then((data) => data);
      res.json(result);
    },
  },
  delete: {
    deleteBuku: async (req, res) => {
      const idBuku = req.params.id;
      const dataBuku = await table('buku')
        .select('kuantitas', 'id_lokasi')
        .where({ id: idBuku })
        .then((res) => res);
      await table('buku').where({ id: idBuku }).del();
      await table('lokasi')
        .where({ id: dataBuku[0].id_lokasi })
        .decrement('kuantitas', dataBuku[0].kuantitas);
      res.send(`buku dengan id ${idBuku} berhasil dihapus`);
    },
  },
  post: {
    addBuku: async (req, res) => {
      const { id_lokasi, kuantitas } = req.body;
      await table('buku').insert(req.body);
      await table('lokasi').where({ id: id_lokasi }).increment('kuantitas', kuantitas);
      res.send('sukses');
    },
  },
};
