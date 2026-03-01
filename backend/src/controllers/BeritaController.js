import Berita from '../models/Berita.js';

class BeritaController {
  async getAll(req, res) {
    try {
      const { status } = req.query;
      const limit = Math.min(parseInt(req.query.limit) || 100, 100);
      const skip = Math.max(parseInt(req.query.skip) || 0, 0);
      const [berita, total] = await Promise.all([Berita.list({ status, limit, skip }), Berita.count({ status })]);
      res.json({ success: true, data: berita, total, limit, skip });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
    }
  }

  async getById(req, res) {
    try {
      const berita = await Berita.findById(req.params.id);
      if (!berita) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
      await Berita.incrementViews(req.params.id);
      res.json({ success: true, data: { ...berita, views: berita.views + 1 } });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
    }
  }

  async getBySlug(req, res) {
    try {
      const berita = await Berita.findBySlug(req.params.slug);
      if (!berita) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
      await Berita.incrementViews(berita.id);
      res.json({ success: true, data: { ...berita, views: berita.views + 1 } });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
    }
  }

  async create(req, res) {
    try {
      const { judul, kategori, status, author, excerpt, konten, gambar, tags } = req.body;
      if (!judul || !kategori || !konten) return res.status(400).json({ success: false, message: 'Judul, kategori, dan konten harus diisi' });
      const berita = await Berita.create({ judul, kategori, status, author: author || req.user.full_name, excerpt, konten, gambar, tags: tags ? (Array.isArray(tags) ? tags : String(tags).split(',').map(t => t.trim())) : [] });
      res.status(201).json({ success: true, message: 'Berita berhasil dibuat', data: berita });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const updates = { ...req.body };
      if (updates.tags && !Array.isArray(updates.tags)) updates.tags = String(updates.tags).split(',').map(t => t.trim());
      const berita = await Berita.update(id, updates);
      if (!berita) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
      res.json({ success: true, message: 'Berita berhasil diupdate', data: berita });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
    }
  }

  async delete(req, res) {
    try {
      const ok = await Berita.deleteById(req.params.id);
      if (!ok) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
      res.json({ success: true, message: 'Berita berhasil dihapus' });
    } catch (error) {
      res.status(500).json({ success: false, message: 'Terjadi kesalahan server', error: error.message });
    }
  }
}

export default new BeritaController();
