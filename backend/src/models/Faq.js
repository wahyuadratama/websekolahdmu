import database from '../config/database.js';

class Faq {
  static async getAll({ publishedOnly = false } = {}) {
    const where = publishedOnly ? 'WHERE is_published = 1' : '';
    const rows = await database.query(
      `SELECT * FROM faq ${where} ORDER BY urutan ASC, created_at DESC`.replace(/\s+/g, ' ').trim()
    );
    return rows.map(this.mapRow);
  }

  static async create(payload) {
    const result = await database.query(
      'INSERT INTO faq (pertanyaan, jawaban, urutan, is_published) VALUES (?,?,?,?)',
      [
        payload.pertanyaan,
        payload.jawaban,
        parseInt(payload.urutan, 10) || 0,
        payload.is_published === undefined ? 1 : (payload.is_published ? 1 : 0),
      ]
    );
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await database.query('SELECT * FROM faq WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }

  static async update(id, payload) {
    const current = await this.findById(id);
    if (!current) return null;
    const data = {
      pertanyaan: payload.pertanyaan ?? current.pertanyaan,
      jawaban: payload.jawaban ?? current.jawaban,
      urutan: payload.urutan !== undefined && payload.urutan !== null && payload.urutan !== ''
        ? (parseInt(payload.urutan, 10) || 0)
        : current.urutan,
      is_published: payload.is_published !== undefined && payload.is_published !== null
        ? (payload.is_published ? 1 : 0)
        : (current.isPublished ? 1 : 0),
    };
    await database.query(
      'UPDATE faq SET pertanyaan=?, jawaban=?, urutan=?, is_published=? WHERE id=?',
      [data.pertanyaan, data.jawaban, data.urutan, data.is_published, id]
    );
    return this.findById(id);
  }

  static async deleteById(id) {
    const result = await database.query('DELETE FROM faq WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static mapRow(row) {
    return {
      id: row.id,
      pertanyaan: row.pertanyaan,
      jawaban: row.jawaban,
      urutan: row.urutan,
      isPublished: Boolean(row.is_published),
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }
}

export default Faq;
