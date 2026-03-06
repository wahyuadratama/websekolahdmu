import database from '../config/database.js';

class Galeri {
  static async getAll({ limit = 0 } = {}) {
    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 0, 0), 100);
    const sql = safeLimit > 0
      ? `SELECT * FROM galeri ORDER BY created_at DESC LIMIT ${safeLimit}`
      : 'SELECT * FROM galeri ORDER BY created_at DESC';
    const rows = await database.query(sql);
    return rows.map(this.mapRow);
  }

  static async create(payload) {
    const result = await database.query('INSERT INTO galeri (judul,deskripsi,url,kategori) VALUES (?,?,?,?)', [payload.judul, payload.deskripsi || null, payload.url, payload.kategori || 'Umum']);
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await database.query('SELECT * FROM galeri WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }

  static async update(id, payload) {
    const current = await this.findById(id);
    if (!current) return null;
    await database.query('UPDATE galeri SET judul=?, deskripsi=?, url=?, kategori=? WHERE id=?', [payload.judul ?? current.judul, payload.deskripsi ?? current.deskripsi, payload.url ?? current.url, payload.kategori ?? current.kategori, id]);
    return this.findById(id);
  }

  static async deleteById(id) {
    const result = await database.query('DELETE FROM galeri WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static mapRow(row) {
    return { id: row.id, judul: row.judul, deskripsi: row.deskripsi, url: row.url, kategori: row.kategori, createdAt: row.created_at, updatedAt: row.updated_at };
  }
}

export default Galeri;
