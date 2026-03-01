import database from '../config/database.js';

const slugify = (text = '') => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

function toSafeInt(value, fallback = 0) {
  const n = Number.parseInt(value, 10);
  return Number.isFinite(n) ? n : fallback;
}

class Berita {
  static async list({ status, limit = 100, skip = 0 }) {
    const safeLimit = Math.min(Math.max(toSafeInt(limit, 100), 1), 100);
    const safeSkip = Math.max(toSafeInt(skip, 0), 0);

    const params = [];
    let where = '';
    if (status) {
      where = 'WHERE status = ?';
      params.push(status);
    }

    const sqlSnake = `SELECT id, judul, slug, kategori, status, author, excerpt, konten, gambar, tags, views, created_at, updated_at FROM berita ${where} ORDER BY created_at DESC LIMIT ${safeLimit} OFFSET ${safeSkip}`;
    const sqlCamel = `SELECT id, judul, slug, kategori, status, author, excerpt, konten, gambar, tags, views, createdAt AS created_at, updatedAt AS updated_at FROM berita ${where} ORDER BY createdAt DESC LIMIT ${safeLimit} OFFSET ${safeSkip}`;

    try {
      const rows = await database.query(sqlSnake, params);
      return rows.map((row) => this.mapRow(row));
    } catch {
      const rows = await database.query(sqlCamel, params);
      return rows.map((row) => this.mapRow(row));
    }
  }

  static async count({ status }) {
    const params = [];
    let where = '';
    if (status) {
      where = 'WHERE status = ?';
      params.push(status);
    }
    const rows = await database.query(`SELECT COUNT(*) AS total FROM berita ${where}`, params);
    return rows[0]?.total || 0;
  }

  static async findById(id) {
    const sqlSnake = 'SELECT id, judul, slug, kategori, status, author, excerpt, konten, gambar, tags, views, created_at, updated_at FROM berita WHERE id = ? LIMIT 1';
    const sqlCamel = 'SELECT id, judul, slug, kategori, status, author, excerpt, konten, gambar, tags, views, createdAt AS created_at, updatedAt AS updated_at FROM berita WHERE id = ? LIMIT 1';
    try {
      const rows = await database.query(sqlSnake, [id]);
      return rows[0] ? this.mapRow(rows[0]) : null;
    } catch {
      const rows = await database.query(sqlCamel, [id]);
      return rows[0] ? this.mapRow(rows[0]) : null;
    }
  }

  static async findBySlug(slug) {
    const sqlSnake = 'SELECT id, judul, slug, kategori, status, author, excerpt, konten, gambar, tags, views, created_at, updated_at FROM berita WHERE slug = ? LIMIT 1';
    const sqlCamel = 'SELECT id, judul, slug, kategori, status, author, excerpt, konten, gambar, tags, views, createdAt AS created_at, updatedAt AS updated_at FROM berita WHERE slug = ? LIMIT 1';
    try {
      const rows = await database.query(sqlSnake, [slug]);
      return rows[0] ? this.mapRow(rows[0]) : null;
    } catch {
      const rows = await database.query(sqlCamel, [slug]);
      return rows[0] ? this.mapRow(rows[0]) : null;
    }
  }

  static async incrementViews(id) {
    try {
      await database.query('UPDATE berita SET views = views + 1 WHERE id = ?', [id]);
    } catch {
      // no-op for legacy schema edge cases
    }
  }

  static async create(payload) {
    const slug = slugify(payload.judul);
    const tags = JSON.stringify(payload.tags || []);
    const result = await database.query(
      'INSERT INTO berita (judul,slug,kategori,status,author,excerpt,konten,gambar,tags,views) VALUES (?,?,?,?,?,?,?,?,?,0)',
      [payload.judul, slug, payload.kategori, payload.status || 'draft', payload.author || 'Admin', payload.excerpt || null, payload.konten, payload.gambar || '', tags]
    );
    return this.findById(result.insertId);
  }

  static async update(id, payload) {
    const current = await this.findById(id);
    if (!current) return null;

    const judul = payload.judul ?? current.judul;
    const slug = payload.judul ? slugify(payload.judul) : current.slug;
    const kategori = payload.kategori ?? current.kategori;
    const status = payload.status ?? current.status;
    const author = payload.author ?? current.author;
    const excerpt = payload.excerpt ?? current.excerpt;
    const konten = payload.konten ?? current.konten;
    const gambar = payload.gambar ?? current.gambar;
    const tags = JSON.stringify(payload.tags ?? current.tags ?? []);

    await database.query('UPDATE berita SET judul=?, slug=?, kategori=?, status=?, author=?, excerpt=?, konten=?, gambar=?, tags=? WHERE id=?', [judul, slug, kategori, status, author, excerpt, konten, gambar, tags, id]);
    return this.findById(id);
  }

  static async deleteById(id) {
    const result = await database.query('DELETE FROM berita WHERE id = ?', [id]);
    return result.affectedRows > 0;
  }

  static mapRow(row) {
    let tags = [];
    if (Array.isArray(row.tags)) {
      tags = row.tags;
    } else if (typeof row.tags === 'string' && row.tags.trim()) {
      try {
        tags = JSON.parse(row.tags);
      } catch {
        tags = [];
      }
    } else if (row.tags && typeof row.tags === 'object') {
      tags = row.tags;
    }

    return {
      id: row.id,
      judul: row.judul,
      slug: row.slug,
      kategori: row.kategori,
      status: row.status,
      author: row.author,
      excerpt: row.excerpt,
      konten: row.konten,
      gambar: row.gambar,
      tags,
      views: row.views,
      createdAt: row.created_at,
      updatedAt: row.updated_at
    };
  }
}

export default Berita;
