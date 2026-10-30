import crypto from 'crypto';
import database from '../config/database.js';

class BeritaSuka {
  static hashIp(ip) {
    return crypto.createHash('sha256').update(String(ip || '')).digest('hex');
  }

  static getClientIp(req) {
    const forwarded = req.headers?.['x-forwarded-for'];
    if (forwarded) {
      return String(forwarded).split(',')[0].trim();
    }
    return req.ip || req.connection?.remoteAddress || '';
  }

  static async countByBerita(beritaId) {
    const rows = await database.query(
      'SELECT COUNT(*) AS total FROM berita_suka WHERE berita_id = ?',
      [beritaId]
    );
    return Number(rows?.[0]?.total || 0);
  }

  // Idempotent: jika (berita_id, ip_hash) sudah ada, tidak nambah — return count saat ini
  static async toggle(beritaId, ip) {
    const ipHash = this.hashIp(ip);
    try {
      await database.query(
        'INSERT INTO berita_suka (berita_id, ip_hash) VALUES (?, ?)',
        [beritaId, ipHash]
      );
    } catch (err) {
      // Duplicate entry (sudah pernah suka) → abaikan, tetap idempotent
      if (err?.code !== 'ER_DUP_ENTRY') throw err;
    }
    const count = await this.countByBerita(beritaId);
    return { count };
  }
}

export default BeritaSuka;
