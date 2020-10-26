const table = require('./model');

const updateKuantitasLokasi = async (idBuku, jumlah, keterangan) => {
  const id_lokasi = await table('buku')
    .select('id_lokasi')
    .where({ id: idBuku })
    .then((res) => res[0].id_lokasi);
  if (keterangan === 'tambah') {
    await table('lokasi').where('id', id_lokasi).increment('kuantitas', jumlah);
  } else {
    await table('lokasi').where('id', id_lokasi).decrement('kuantitas', jumlah);
  }
};
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
    getTransaksi: async (req, res) => {
      const result = await table('transaksi').then((res) => res);
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
    addTransaksiPeminjaman: async (req, res) => {
      const {
        id_anggota,
        id_petugas,
        id_buku,
        jenis_transaksi,
        jumlah_buku_pinjam,
      } = req.body;

      const date = new Date();
      const waktu = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      let idValue = 0;
      await table('transaksi')
        .limit(1)
        .select('id')
        .orderBy('id', 'desc')
        .then(async (res) => {
          idValue = res[0].id + 1;
          await table('transaksi').insert({
            id: idValue,
            id_anggota,
            id_petugas,
            id_buku,
            jenis_transaksi,
            tgl_transaksi: waktu,
          });
        });

      await table('transaksi')
        .select('id')
        .limit(1)
        .orderBy('id', 'desc')
        .then(async (res3) => {
          await table('peminjaman').insert({
            id: res3[0].id + 1,
            id_buku,
            id_transaksi: idValue,
            tgl_pinjam: waktu,
            jumlah_buku_pinjam,
            status: 'aktif',
          });
        });

      await table('buku').where('id', id_buku).decrement('kuantitas', jumlah_buku_pinjam);
      updateKuantitasLokasi(id_buku, jumlah_buku_pinjam, 'kurang');
      res.send('sukses');
    },
    addTransaksiPengembalian: async (req, res) => {
      const {
        id_anggota,
        id_petugas,
        id_buku,
        jenis_transaksi,
        id_peminjaman,
        jumlah_buku_kembali,
        denda,
      } = req.body;

      const date = new Date();
      const waktu = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
      let idValue = 0;
      await table('transaksi')
        .select('id')
        .limit(1)
        .orderBy('id', 'desc')
        .then(async (res) => {
          idValue = res[0].id + 1;
          await table('transaksi').insert({
            id: idValue,
            id_anggota,
            id_petugas,
            id_buku,
            jenis_transaksi,
            tgl_transaksi: waktu,
          });
        });

      await table('pengembalian')
        .select('id')
        .limit(1)
        .orderBy('id', 'desc')
        .then(async (res) => {
          await table('pengembalian')
            .insert({
              id: res[0].id + 1,
              id_peminjaman,
              tgl_kembali: waktu,
              jumlah_buku_kembali,
              denda,
            })
            .then(async (res) => {
              await table('peminjaman')
                .update('status', ' Non Aktif')
                .where('id', id_peminjaman);
              await table('buku')
                .where('id', id_buku)
                .increment('kuantitas', jumlah_buku_kembali);
              updateKuantitasLokasi(id_buku, jumlah_buku_kembali, 'tambah');
            });
        });

      res.send('sukses');
    },
  },
};
