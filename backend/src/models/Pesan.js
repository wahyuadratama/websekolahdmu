import database from '../config/database.js';

class Pesan {
  static async getAll() {
    const rows = await database.query('SELECT * FROM pesan ORDER BY created_at DESC');
    return rows.map(this.mapRow);
  }

  static async create(payload) {
    const result = await database.query('INSERT INTO pesan (nama,email,subjek,pesan,status) VALUES (?,?,?,?,?)', [payload.nama, payload.email, payload.subjek, payload.pesan, payload.status || 'unread']);
    return this.findById(result.insertId);
  }

  static async findById(id) {
    const rows = await database.query('SELECT * FROM pesan WHERE id=? LIMIT 1', [id]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }

  static async markAsRead(id) {
    await database.query("UPDATE pesan SET status='read' WHERE id=?", [id]);
    return this.findById(id);
  }

  static async deleteById(id) {
    const result = await database.query('DELETE FROM pesan WHERE id=?', [id]);
    return result.affectedRows > 0;
  }

  static mapRow(row) { return { id: row.id, nama: row.nama, email: row.email, subjek: row.subjek, pesan: row.pesan, status: row.status, createdAt: row.created_at, updatedAt: row.updated_at }; }
}

export default Pesan;
