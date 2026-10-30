import database from '../config/database.js';

export const TINGKAT_PRESTASI = ['sekolah', 'kabupaten', 'provinsi', 'nasional', 'internasional'];

class Prestasi {
  static async getAll({ publishedOnly = false, tahun = '', tingkat = '' } = {}) {
    const conds = [];
    const params = [];
    if (publishedOnly) conds.push('is_published = 1');
    if (tahun) { conds.push('tahun = ?'); params.push(String(tahun)); }
    if (tingkat) { conds.push('tingkat = ?'); params.push(String(tingkat)); }
    const where = conds.length ? `WHERE ${conds.join(' AND ')}` : '';
    const rows = await database.query(
      `SELECT * FROM prestasi ${where} ORDER BY tahun DESC, created_at DESC`.replace(/\s+/g, ' ').trim(),
      params
    );
    return rows.map(this.mapRow);
  }

  static async create(payload) {
    const result = await database.query(
      'INSERT INTO prestasi (judul, deskripsi, tahun, tingkat, foto, is_published) VALUES (?,?,?,?,?,?)',
      [
        payload.judul,
        payload.deskripsi || null,
        payload.tahun || null,
        TINGKAT_PRESTASI.includes(payload.tingkat) ? payload.tingkat : 'sekolah',
        payload.foto || '',
        payload.is_published === undefined ? 1 : (payload.is_published ? 1 : 0),
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await database.query('SELECT * FROM prestasi WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }

  static async update(id, payload) {
    const current = await this.findById(id);
    if (!current) return null;
    const data = {
      judul: payload.judul ?? current.judul,
      deskripsi: payload.deskripsi ?? current.deskripsi,
      tahun: payload.tahun !== undefined ? (payload.tahun || null) : current.tahun,
      tingkat: payload.tingkat !== undefined && TINGKAT_PRESTASI.includes(payload.tingkat)
        ? payload.tingkat
        : current.tingkat,
      foto: payload.foto ?? current.foto,
      is_published: payload.is_published !== undefined && payload.is_published !== null
        ? (payload.is_published ? 1 : 0)
        : (current.isPublished ? 1 : 0),
    };
    await database.query(
      'UPDATE prestasi SET judul=?, deskripsi=?, tahun=?, tingkat=?, foto=?, is_published=? WHERE id=?',
      [data.judul, data.deskripsi, data.tahun, data.tingkat, data.foto, data.is_published, id]
    );
    return this.findById(id);
  }

  static async deleteById(id) {
    const result = await database.query('DELETE FROM prestasi WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static mapRow(row) {
    return {
      id: row.id,
      judul: row.judul,
      deskripsi: row.deskripsi,
      tahun: row.tahun,
      tingkat: row.tingkat,
      foto: row.foto,
      isPublished: Boolean(row.is_published),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}

export default Prestasi;
