import database from '../config/database.js';

class Guru {
  static async getAll({ activeOnly = true, limit = 0 } = {}) {
    const safeLimit = Math.min(Math.max(parseInt(limit, 10) || 0, 0), 100);
    const limitSql = safeLimit > 0 ? ` LIMIT ${safeLimit}` : '';
    const rows = activeOnly
      ? await database.query(`SELECT * FROM guru WHERE status='aktif' ORDER BY created_at DESC${limitSql}`)
      : await database.query(`SELECT * FROM guru ORDER BY created_at DESC${limitSql}`);
    return rows.map(this.mapRow);
  }

  static async create(payload) {
    const foto = payload.foto || `https://ui-avatars.com/api/?name=${encodeURIComponent(payload.nama)}&size=200&background=random&color=fff`;
    const result = await database.query('INSERT INTO guru (nama,nip,mapel,pendidikan,foto,status) VALUES (?,?,?,?,?,?)', [payload.nama, payload.nip, payload.mapel, payload.pendidikan || null, foto, payload.status || 'aktif']);
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await database.query('SELECT * FROM guru WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }

  static async update(id, payload) {
    const current = await this.findById(id);
    if (!current) return null;
    await database.query('UPDATE guru SET nama=?, nip=?, mapel=?, pendidikan=?, foto=?, status=? WHERE id=?', [payload.nama ?? current.nama, payload.nip ?? current.nip, payload.mapel ?? current.mapel, payload.pendidikan ?? current.pendidikan, payload.foto ?? current.foto, payload.status ?? current.status, id]);
    return this.findById(id);
  }

  static async deleteById(id) {
    const result = await database.query('DELETE FROM guru WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static mapRow(row) {
    return { id: row.id, nama: row.nama, nip: row.nip, mapel: row.mapel, pendidikan: row.pendidikan, foto: row.foto, status: row.status, createdAt: row.created_at, updatedAt: row.updated_at };
  }
}

export default Guru;
