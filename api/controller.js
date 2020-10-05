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
      const kuantitasAwal = await table('lokasi')
        .select('kuantitas')
        .where({ id: dataBuku[0].id_lokasi })
        .then((res) => res[0].kuantitas);
      await table('buku').where({ id: idBuku }).del();
      res.send(`buku dengan id ${idBuku} berhasil dihapus`);
      await table('lokasi')
        .where({ id: dataBuku[0].id_lokasi })
        .update({ kuantitas: kuantitasAwal - dataBuku[0].kuantitas });
    },
  },
  post: {
    addBuku: async (req, res) => {
      const { id, id_lokasi, judul, pengarang, kuantitas } = req.body;
      let kuantitasAwal = table.select('kuantitas').from('lokasi').where('id', id_lokasi);
      kuantitasAwal = await kuantitasAwal.then((data) => data[0].kuantitas);
      await table('buku').insert(req.body);
      await table('lokasi')
        .where({ id: id_lokasi })
        .update({ kuantitas: kuantitasAwal + kuantitas })
        .then((res) => console.log(res));
      res.send('sukses');
    },
  },
};
