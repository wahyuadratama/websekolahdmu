import database from '../config/database.js';

class Pimpinan {
  static async getAll({ publishedOnly = false, limit = 0 } = {}) {
    const where = publishedOnly ? 'WHERE is_published = 1' : '';
    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 0, 0), 100);
    const limitSql = safeLimit > 0 ? `LIMIT ${safeLimit}` : '';
    const rows = await database.query(
      `SELECT * FROM pimpinan ${where} ORDER BY urutan ASC, created_at DESC ${limitSql}`.replace(/\s+/g, ' ').trim()
    );
    return rows.map(this.mapRow);
  }

  static async create(payload) {
    const result = await database.query(
      'INSERT INTO pimpinan (nama, jabatan, foto, bio_singkat, urutan, is_published) VALUES (?,?,?,?,?,?)',
      [
        payload.nama,
        payload.jabatan,
        payload.foto || '',
        payload.bio_singkat || null,
        parseInt(payload.urutan, 10) || 0,
        payload.is_published === undefined ? 1 : (payload.is_published ? 1 : 0),
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await database.query('SELECT * FROM pimpinan WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }

  static async update(id, payload) {
    const current = await this.findById(id);
    if (!current) return null;
    const data = {
      nama: payload.nama ?? current.nama,
      jabatan: payload.jabatan ?? current.jabatan,
      foto: payload.foto ?? current.foto,
      bio_singkat: payload.bio_singkat ?? current.bioSingkat,
      urutan: payload.urutan !== undefined && payload.urutan !== null && payload.urutan !== ''
        ? (parseInt(payload.urutan, 10) || 0)
        : current.urutan,
      is_published: payload.is_published !== undefined && payload.is_published !== null
        ? (payload.is_published ? 1 : 0)
        : (current.isPublished ? 1 : 0),
    };
    await database.query(
      'UPDATE pimpinan SET nama=?, jabatan=?, foto=?, bio_singkat=?, urutan=?, is_published=? WHERE id=?',
      [data.nama, data.jabatan, data.foto, data.bio_singkat, data.urutan, data.is_published, id]
    );
    return this.findById(id);
  }

  static async deleteById(id) {
    const result = await database.query('DELETE FROM pimpinan WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static mapRow(row) {
    return {
      id: row.id,
      nama: row.nama,
      jabatan: row.jabatan,
      foto: row.foto,
      bioSingkat: row.bio_singkat,
      urutan: row.urutan,
      isPublished: Boolean(row.is_published),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}

export default Pimpinan;
