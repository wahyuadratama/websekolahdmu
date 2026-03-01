import database from '../config/database.js';

function generateNoPendaftaran() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const random = String(Math.floor(Math.random() * 99999)).padStart(5, '0');
  return `REG-${year}${month}${day}-${random}`;
}

class Pendaftaran {
  static async getAll() {
    const rows = await database.query('SELECT * FROM pendaftaran ORDER BY created_at DESC');
    return rows.map(this.mapRow);
  }

  static async create(payload) {
    const noPendaftaran = generateNoPendaftaran();
    const result = await database.query(
      'INSERT INTO pendaftaran (no_pendaftaran,nama,nisn,tempat_lahir,tanggal_lahir,jenis_kelamin,asal_sekolah,alamat,nama_ortu,telepon,email,status) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
      [noPendaftaran, payload.nama, payload.nisn, payload.tempat_lahir, payload.tanggal_lahir, payload.jenis_kelamin, payload.asal_sekolah, payload.alamat, payload.nama_ortu, payload.telepon, payload.email || null, payload.status || 'pending']
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await database.query('SELECT * FROM pendaftaran WHERE id=? LIMIT 1', [id]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }

  static async countDocuments() {
    const rows = await database.query('SELECT COUNT(*) AS count FROM pendaftaran');
    return rows[0]?.count || 0;
  }

  static mapRow(row) {
    return {
      id: row.id,
      noPendaftaran: row.no_pendaftaran,
      nama: row.nama,
      nisn: row.nisn,
      tempat_lahir: row.tempat_lahir,
      tanggal_lahir: row.tanggal_lahir,
      jenis_kelamin: row.jenis_kelamin,
      asal_sekolah: row.asal_sekolah,
      alamat: row.alamat,
      nama_ortu: row.nama_ortu,
      telepon: row.telepon,
      email: row.email,
      status: row.status,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

export default Pendaftaran;
