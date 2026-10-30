import database from '../config/database.js';

class Unduhan {
  static async getAll({ publishedOnly = false } = {}) {
    const where = publishedOnly ? 'WHERE is_published = 1' : '';
    const rows = await database.query(
      `SELECT * FROM unduhan ${where} ORDER BY urutan ASC, created_at DESC`.replace(/\s+/g, ' ').trim()
    );
    return rows.map(this.mapRow);
  }

  static async create(payload) {
    const result = await database.query(
      'INSERT INTO unduhan (judul, deskripsi, file_url, kategori, urutan, is_published) VALUES (?,?,?,?,?,?)',
      [
        payload.judul,
        payload.deskripsi || null,
        payload.file_url,
        payload.kategori || 'Umum',
        parseInt(payload.urutan, 10) || 0,
        payload.is_published === undefined ? 1 : (payload.is_published ? 1 : 0),
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await database.query('SELECT * FROM unduhan WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }

  static async update(id, payload) {
    const current = await this.findById(id);
    if (!current) return null;
    const data = {
      judul: payload.judul ?? current.judul,
      deskripsi: payload.deskripsi ?? current.deskripsi,
      file_url: payload.file_url ?? current.file_url,
      kategori: payload.kategori ?? current.kategori,
      urutan: payload.urutan !== undefined && payload.urutan !== null && payload.urutan !== ''
        ? (parseInt(payload.urutan, 10) || 0)
        : current.urutan,
      is_published: payload.is_published !== undefined && payload.is_published !== null
        ? (payload.is_published ? 1 : 0)
        : (current.isPublished ? 1 : 0),
    };
    await database.query(
      'UPDATE unduhan SET judul=?, deskripsi=?, file_url=?, kategori=?, urutan=?, is_published=? WHERE id=?',
      [data.judul, data.deskripsi, data.file_url, data.kategori, data.urutan, data.is_published, id]
    );
    return this.findById(id);
  }

  static async deleteById(id) {
    const result = await database.query('DELETE FROM unduhan WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static mapRow(row) {
    return {
      id: row.id,
      judul: row.judul,
      deskripsi: row.deskripsi,
      fileUrl: row.file_url,
      kategori: row.kategori,
      urutan: row.urutan,
      isPublished: Boolean(row.is_published),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}

export default Unduhan;
