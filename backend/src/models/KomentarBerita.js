import database from '../config/database.js';

class KomentarBerita {
  static mapRow(row) {
    return {
      id: row.id,
      beritaId: row.berita_id,
      nama: row.nama,
      isi: row.isi,
      status: row.status,
      createdAt: row.created_at,
    };
  }

  static async getApproved(beritaId) {
    const rows = await database.query(
      "SELECT * FROM komentar_berita WHERE berita_id = ? AND status = 'approved' ORDER BY created_at DESC",
      [beritaId]
    );
    return rows.map(this.mapRow);
  }

  static async countApproved(beritaId) {
    const rows = await database.query(
      "SELECT COUNT(*) AS total FROM komentar_berita WHERE berita_id = ? AND status = 'approved'",
      [beritaId]
    );
    return Number(rows?.[0]?.total || 0);
  }

  static async getAllAdmin() {
    const rows = await database.query('SELECT * FROM komentar_berita ORDER BY created_at DESC');
    return rows.map(this.mapRow);
  }

  static async createPending({ beritaId, nama, isi }) {
    const result = await database.query(
      `INSERT INTO komentar_berita (berita_id, nama, isi, status)
       VALUES (?, ?, ?, 'pending')`,
      [beritaId, nama, isi]
    );
    const insertId = result?.insertId;
    const rows = await database.query('SELECT * FROM komentar_berita WHERE id = ? LIMIT 1', [insertId]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }

  static async moderate(id, action) {
    const status = action === 'approve' ? 'approved' : 'rejected';
    await database.query('UPDATE komentar_berita SET status = ? WHERE id = ?', [status, id]);
    const rows = await database.query('SELECT * FROM komentar_berita WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }

  static async deleteById(id) {
    await database.query('DELETE FROM komentar_berita WHERE id = ?', [id]);
    return true;
  }
}

export default KomentarBerita;
