import Galeri from '../models/Galeri.js';
import Guru from '../models/Guru.js';
import Pesan from '../models/Pesan.js';
import Pendaftaran from '../models/Pendaftaran.js';
import Settings from '../models/Settings.js';

class GaleriController {
  async getAll(req, res) {
    try {
      const limit = Math.min(Math.max(parseInt(req.query.limit || '0', 10) || 0, 0), 100);
      res.json({ success: true, data: await Galeri.getAll({ limit }) });
    }
    catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
  async create(req, res) {
    try { res.status(201).json({ success: true, data: await Galeri.create(req.body) }); }
    catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
  async update(req, res) {
    try { const item = await Galeri.update(req.params.id, req.body); if (!item) return res.status(404).json({ success:false, message:'Galeri tidak ditemukan' }); res.json({ success:true, data:item }); }
    catch (error) { res.status(500).json({ success:false, message:error.message }); }
  }
  async delete(req, res) {
    try { const ok = await Galeri.deleteById(req.params.id); if (!ok) return res.status(404).json({ success:false, message:'Galeri tidak ditemukan' }); res.json({ success:true, message:'Galeri berhasil dihapus' }); }
    catch (error) { res.status(500).json({ success:false, message:error.message }); }
  }
}

class GuruController {
  async getAll(req, res) {
    try {
      const limit = Math.min(Math.max(parseInt(req.query.limit || '0', 10) || 0, 0), 100);
      res.json({ success:true, data: await Guru.getAll({ activeOnly: true, limit }) });
    } catch (error) { res.status(500).json({ success:false, message:error.message }); }
  }
  async create(req, res) { try { res.status(201).json({ success:true, data: await Guru.create(req.body) }); } catch (error) { res.status(500).json({ success:false, message:error.message }); } }
  async update(req, res) { try { const item = await Guru.update(req.params.id, req.body); if(!item) return res.status(404).json({ success:false, message:'Guru tidak ditemukan' }); res.json({ success:true, data:item }); } catch (error) { res.status(500).json({ success:false, message:error.message }); } }
  async delete(req, res) { try { const ok = await Guru.deleteById(req.params.id); if(!ok) return res.status(404).json({ success:false, message:'Guru tidak ditemukan' }); res.json({ success:true, message:'Guru berhasil dihapus' }); } catch (error) { res.status(500).json({ success:false, message:error.message }); } }
}

class PesanController {
  async getAll(req, res) { try { res.json({ success:true, data: await Pesan.getAll() }); } catch (error) { res.status(500).json({ success:false, message:error.message }); } }
  async create(req, res) { try { const item = await Pesan.create(req.body); res.status(201).json({ success:true, message:'Pesan berhasil dikirim', data:item }); } catch (error) { res.status(500).json({ success:false, message:error.message }); } }
  async markAsRead(req, res) { try { const item = await Pesan.markAsRead(req.params.id); if(!item) return res.status(404).json({ success:false, message:'Pesan tidak ditemukan' }); res.json({ success:true, data:item }); } catch (error) { res.status(500).json({ success:false, message:error.message }); } }
  async delete(req, res) { try { const ok = await Pesan.deleteById(req.params.id); if(!ok) return res.status(404).json({ success:false, message:'Pesan tidak ditemukan' }); res.json({ success:true, message:'Pesan berhasil dihapus' }); } catch (error) { res.status(500).json({ success:false, message:error.message }); } }
}

class PendaftaranController {
  async getAll(req, res) { try { res.json({ success:true, data: await Pendaftaran.getAll() }); } catch (error) { res.status(500).json({ success:false, message:error.message }); } }
  async create(req, res) { try { const item = await Pendaftaran.create(req.body); res.status(201).json({ success:true, message:'Pendaftaran berhasil', data:{ noPendaftaran: item.noPendaftaran } }); } catch (error) { res.status(500).json({ success:false, message:error.message }); } }
  async getCount(req, res) { try { const count = await Pendaftaran.countDocuments(); res.json({ success:true, data:{ count } }); } catch (error) { res.status(500).json({ success:false, message:error.message }); } }
}

class SettingsController {
  async getStats(req, res) {
    try {
      const siswa = await Settings.getSetting('stats_siswa') || 1200;
      const pendaftar = await Settings.getSetting('stats_pendaftar') || 0;
      const guru = await Settings.getSetting('stats_guru') || 85;
      const keahlian = await Settings.getSetting('stats_keahlian') || 15;
      const prestasi = await Settings.getSetting('stats_prestasi') || 50;
      res.json({ success:true, data:{ siswa, pendaftar, guru, keahlian, prestasi } });
    } catch (error) { res.status(500).json({ success:false, message:error.message }); }
  }
  async updateStats(req, res) {
    try {
      const { siswa, pendaftar, guru, keahlian, prestasi } = req.body;
      if (siswa !== undefined) await Settings.setSetting('stats_siswa', siswa);
      if (pendaftar !== undefined) await Settings.setSetting('stats_pendaftar', pendaftar);
      if (guru !== undefined) await Settings.setSetting('stats_guru', guru);
      if (keahlian !== undefined) await Settings.setSetting('stats_keahlian', keahlian);
      if (prestasi !== undefined) await Settings.setSetting('stats_prestasi', prestasi);
      res.json({ success:true, message:'Statistik berhasil diupdate' });
    } catch (error) { res.status(500).json({ success:false, message:error.message }); }
  }
}

class TestimoniController {
  async _loadList() {
    const raw = await Settings.getSetting('testimonials');
    if (typeof raw === 'string' && raw.trim()) {
      try { return JSON.parse(raw); } catch { return []; }
    }
    return [];
  }

  _normalizeItem(item, idx = 0) {
    const status = String(item.status || '').toLowerCase();
    return {
      id: item.id || `tmn-${Date.now()}-${idx}`,
      quote: String(item.quote || '').trim(),
      name: String(item.name || '').trim(),
      role: String(item.role || '').trim(),
      source: String(item.source || '').trim(),
      year: String(item.year || '').trim(),
      isVerified: Boolean(item.isVerified),
      isPublished: item.isPublished !== false,
      status: ['pending', 'approved', 'rejected'].includes(status) ? status : 'approved',
      submittedAt: item.submittedAt || new Date().toISOString(),
      reviewedAt: item.reviewedAt || null,
    };
  }

  async _saveList(list) {
    await Settings.setSetting('testimonials', JSON.stringify(list), 'Daftar testimoni terverifikasi');
  }

  async getAll(req, res) {
    try {
      const list = await this._loadList();
      const includeUnpublished = req.query.all === '1';
      const data = includeUnpublished
        ? list
        : list.filter((item) => item?.isPublished !== false && item?.status === 'approved');
      res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }

  async saveAll(req, res) {
    try {
      const incoming = Array.isArray(req.body?.items) ? req.body.items : [];
      const normalized = incoming
        .map((item, idx) => this._normalizeItem(item, idx))
        .filter((item) => item.quote && item.name && item.role);

      await this._saveList(normalized);
      res.json({ success: true, message: 'Testimoni berhasil disimpan', data: normalized });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }

  async submit(req, res) {
    try {
      const payload = this._normalizeItem({
        quote: req.body?.quote,
        name: req.body?.name,
        role: req.body?.role,
        source: req.body?.source || 'Form website',
        year: req.body?.year,
        isVerified: false,
        isPublished: false,
        status: 'pending',
        submittedAt: new Date().toISOString(),
      });

      if (!payload.quote || !payload.name || !payload.role) {
        return res.status(400).json({ success: false, message: 'Nama, peran, dan isi testimoni wajib diisi.' });
      }

      const list = await this._loadList();
      list.unshift(payload);
      await this._saveList(list);

      res.status(201).json({ success: true, message: 'Testimoni berhasil dikirim dan menunggu verifikasi admin.' });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }

  async moderate(req, res) {
    try {
      const { id } = req.params;
      const action = String(req.body?.action || '').toLowerCase();
      if (!['approve', 'reject'].includes(action)) {
        return res.status(400).json({ success: false, message: 'Action tidak valid.' });
      }

      const list = await this._loadList();
      const idx = list.findIndex((item) => item.id === id);
      if (idx === -1) return res.status(404).json({ success: false, message: 'Testimoni tidak ditemukan.' });

      const current = this._normalizeItem(list[idx], idx);
      const approved = action === 'approve';
      list[idx] = {
        ...current,
        status: approved ? 'approved' : 'rejected',
        isVerified: approved,
        isPublished: approved,
        reviewedAt: new Date().toISOString(),
      };

      await this._saveList(list);
      res.json({ success: true, message: approved ? 'Testimoni disetujui.' : 'Testimoni ditolak.', data: list[idx] });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
}

export const galeriController = new GaleriController();
export const guruController = new GuruController();
export const pesanController = new PesanController();
export const pendaftaranController = new PendaftaranController();
export const settingsController = new SettingsController();
export const testimoniController = new TestimoniController();
