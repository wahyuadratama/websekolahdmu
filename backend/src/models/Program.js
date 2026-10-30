import database from '../config/database.js';

class Program {
  static async getAll({ publishedOnly = false, limit = 0 } = {}) {
    const where = publishedOnly ? 'WHERE is_published = 1' : '';
    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 0, 0), 100);
    const limitSql = safeLimit > 0 ? `LIMIT ${safeLimit}` : '';
    const rows = await database.query(
      `SELECT * FROM program ${where} ORDER BY urutan ASC, created_at DESC ${limitSql}`.replace(/\s+/g, ' ').trim()
    );
    return rows.map(this.mapRow);
  }

  static async create(payload) {
    const result = await database.query(
      'INSERT INTO program (judul, deskripsi, foto, urutan, is_published) VALUES (?,?,?,?,?)',
      [
        payload.judul,
        payload.deskripsi || null,
        payload.foto || '',
        parseInt(payload.urutan, 10) || 0,
        payload.is_published === undefined ? 1 : (payload.is_published ? 1 : 0),
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await database.query('SELECT * FROM program WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }

  static async update(id, payload) {
    const current = await this.findById(id);
    if (!current) return null;
    const data = {
      judul: payload.judul ?? current.judul,
      deskripsi: payload.deskripsi ?? current.deskripsi,
      foto: payload.foto ?? current.foto,
      urutan: payload.urutan !== undefined && payload.urutan !== null && payload.urutan !== ''
        ? (parseInt(payload.urutan, 10) || 0)
        : current.urutan,
      is_published: payload.is_published !== undefined && payload.is_published !== null
        ? (payload.is_published ? 1 : 0)
        : (current.isPublished ? 1 : 0),
    };
    await database.query(
      'UPDATE program SET judul=?, deskripsi=?, foto=?, urutan=?, is_published=? WHERE id=?',
      [data.judul, data.deskripsi, data.foto, data.urutan, data.is_published, id]
    );
    return this.findById(id);
  }

  static async deleteById(id) {
    const result = await database.query('DELETE FROM program WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static mapRow(row) {
    return {
      id: row.id,
      judul: row.judul,
      deskripsi: row.deskripsi,
      foto: row.foto,
      urutan: row.urutan,
      isPublished: Boolean(row.is_published),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}

export default Program;
