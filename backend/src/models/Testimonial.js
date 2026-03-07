import database from '../config/database.js';

class Testimonial {
  static migrated = false;

  static async migrateFromSettingsIfNeeded() {
    if (this.migrated) return;

    const countRows = await database.query('SELECT COUNT(*) AS total FROM testimonials');
    const total = Number(countRows?.[0]?.total || 0);
    if (total > 0) {
      this.migrated = true;
      return;
    }

    const rows = await database.query("SELECT value_text FROM settings WHERE `key`='testimonials' LIMIT 1");
    const raw = rows?.[0]?.value_text;
    if (!raw) {
      this.migrated = true;
      return;
    }

    let list = [];
    try { list = JSON.parse(raw); } catch { list = []; }
    if (!Array.isArray(list) || list.length === 0) {
      this.migrated = true;
      return;
    }

    for (let i = 0; i < list.length; i += 1) {
      const item = list[i] || {};
      await database.query(
        `INSERT INTO testimonials (id, name, role, quote, source, year, status, is_verified, is_published, submitted_at, reviewed_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE
           name=VALUES(name), role=VALUES(role), quote=VALUES(quote), source=VALUES(source), year=VALUES(year),
           status=VALUES(status), is_verified=VALUES(is_verified), is_published=VALUES(is_published),
           reviewed_at=VALUES(reviewed_at)`,
        [
          item.id || `tmn-${Date.now()}-${i}`,
          item.name || '',
          item.role || '',
          item.quote || '',
          item.source || '',
          item.year || '',
          ['pending', 'approved', 'rejected'].includes(item.status) ? item.status : 'approved',
          item.isVerified ? 1 : 0,
          item.isPublished !== false ? 1 : 0,
          item.submittedAt || new Date(),
          item.reviewedAt || null,
        ]
      );
    }

    this.migrated = true;
  }

  static mapRow(row) {
    return {
      id: row.id,
      name: row.name,
      role: row.role,
      quote: row.quote,
      source: row.source,
      year: row.year,
      status: row.status,
      isVerified: Boolean(row.is_verified),
      isPublished: Boolean(row.is_published),
      submittedAt: row.submitted_at,
      reviewedAt: row.reviewed_at,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    };
  }

  static async getAll({ includeUnpublished = false } = {}) {
    await this.migrateFromSettingsIfNeeded();

    const rows = includeUnpublished
      ? await database.query('SELECT * FROM testimonials ORDER BY created_at DESC')
      : await database.query("SELECT * FROM testimonials WHERE status='approved' AND is_published=1 ORDER BY created_at DESC");

    return rows.map(this.mapRow);
  }

  static async replaceAll(items = []) {
    await this.migrateFromSettingsIfNeeded();

    await database.query('DELETE FROM testimonials');
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i] || {};
      await database.query(
        `INSERT INTO testimonials (id, name, role, quote, source, year, status, is_verified, is_published, submitted_at, reviewed_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          item.id || `tmn-${Date.now()}-${i}`,
          item.name || '',
          item.role || '',
          item.quote || '',
          item.source || '',
          item.year || '',
          ['pending', 'approved', 'rejected'].includes(item.status) ? item.status : 'approved',
          item.isVerified ? 1 : 0,
          item.isPublished !== false ? 1 : 0,
          item.submittedAt || new Date(),
          item.reviewedAt || null,
        ]
      );
    }

    return this.getAll({ includeUnpublished: true });
  }

  static async createPending(payload) {
    await this.migrateFromSettingsIfNeeded();

    const id = payload.id || `tmn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    await database.query(
      `INSERT INTO testimonials (id, name, role, quote, source, year, status, is_verified, is_published, submitted_at)
       VALUES (?, ?, ?, ?, ?, ?, 'pending', 0, 0, ?)`,
      [id, payload.name, payload.role, payload.quote, payload.source || 'Form website', payload.year || '', new Date()]
    );

    const rows = await database.query('SELECT * FROM testimonials WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }

  static async moderate(id, action) {
    await this.migrateFromSettingsIfNeeded();

    const approved = action === 'approve';
    await database.query(
      `UPDATE testimonials SET status=?, is_verified=?, is_published=?, reviewed_at=NOW() WHERE id=?`,
      [approved ? 'approved' : 'rejected', approved ? 1 : 0, approved ? 1 : 0, id]
    );

    const rows = await database.query('SELECT * FROM testimonials WHERE id = ? LIMIT 1', [id]);
    return rows[0] ? this.mapRow(rows[0]) : null;
  }
}

export default Testimonial;
