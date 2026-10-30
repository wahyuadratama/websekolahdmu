import Galeri from '../models/Galeri.js';
import Guru from '../models/Guru.js';
import Pesan from '../models/Pesan.js';
import Pendaftaran from '../models/Pendaftaran.js';
import Settings from '../models/Settings.js';
import Testimonial from '../models/Testimonial.js';
import Program from '../models/Program.js';
import Prestasi from '../models/Prestasi.js';
import Pimpinan from '../models/Pimpinan.js';
import Fasilitas from '../models/Fasilitas.js';
import KomentarBerita from '../models/KomentarBerita.js';
import Berita from '../models/Berita.js';

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

  async getPpsb(req, res) {
    try {
      const raw = await Settings.getSetting('ppsb_config');
      let parsed = null;
      if (typeof raw === 'string') {
        try { parsed = JSON.parse(raw); } catch { parsed = null; }
      }
      if (!parsed || typeof parsed !== 'object') {
        parsed = {
          timeline: [
            { tanggal: '1 November 2025', nama: 'Pembukaan Pendaftaran Santri Baru', status: 'Buka' },
            { tanggal: '8 Februari 2026', nama: 'Ujian Masuk Gelombang Pertama', status: 'Buka' },
            { tanggal: '7 Juni 2026', nama: 'Ujian Masuk Gelombang Kedua', status: 'Buka' },
            { tanggal: '12 Juli 2026', nama: 'Penutupan Pendaftaran', status: 'Segera' }
          ],
          biayaUjian: 'Rp150.000',
          biaya: {
            awalItems: [
              'Uang pangkal masuk KMI: Rp1.500.000', 'Uang makan bulanan: Rp400.000', 'Iuran sekolah dan asrama bulanan: Rp200.000',
              'Uang kesehatan (tahunan): Rp150.000', 'Sewa almari (tahunan): Rp300.000', 'Kasur: Rp550.000',
              'Kegiatan ekstrakurikuler (tahunan): Rp150.000', 'Buku paket: Rp650.000', 'Iuran Pramuka (tahunan): Rp100.000', 'Iuran kertas (tahunan): Rp100.000'
            ],
            awalTotal: 'Rp4.100.000',
            putraItems: ['Kaos olahraga: Rp200.000', 'Seragam Tapak Suci: Rp160.000', '3 kemeja: Rp480.000'],
            putraTotal: 'Rp840.000',
            putriItems: ['Kaos olahraga: Rp220.000', 'Seragam Tapak Suci: Rp160.000', 'Jubah toska: Rp190.000', 'Jubah biru: Rp160.000', 'Jilbab putih & coklat: Rp110.000'],
            putriTotal: 'Rp840.000',
            catatan: 'Catatan: Harga sewaktu-waktu dapat berubah.'
          }
        };
      }
      res.json({ success: true, data: parsed });
    } catch (error) { res.status(500).json({ success:false, message:error.message }); }
  }

  async updatePpsb(req, res) {
    try {
      const { timeline, biayaUjian, biaya } = req.body || {};
      const normalizedTimeline = Array.isArray(timeline)
        ? timeline.slice(0, 8).map((t) => ({
            tanggal: String(t?.tanggal || '').trim(),
            nama: String(t?.nama || '').trim(),
            status: String(t?.status || 'Buka').trim() || 'Buka'
          })).filter((t) => t.tanggal && t.nama)
        : [];

      const normList = (arr, fallback=[]) => Array.isArray(arr) ? arr.map((x) => String(x || '').trim()).filter(Boolean) : fallback;
      const payload = {
        timeline: normalizedTimeline.length ? normalizedTimeline : [
          { tanggal: '1 November 2025', nama: 'Pembukaan Pendaftaran Santri Baru', status: 'Buka' },
          { tanggal: '8 Februari 2026', nama: 'Ujian Masuk Gelombang Pertama', status: 'Buka' },
          { tanggal: '7 Juni 2026', nama: 'Ujian Masuk Gelombang Kedua', status: 'Buka' },
          { tanggal: '12 Juli 2026', nama: 'Penutupan Pendaftaran', status: 'Segera' }
        ],
        biayaUjian: String(biayaUjian || 'Rp150.000').trim() || 'Rp150.000',
        biaya: {
          awalItems: normList(biaya?.awalItems, [
            'Uang pangkal masuk KMI: Rp1.500.000', 'Uang makan bulanan: Rp400.000', 'Iuran sekolah dan asrama bulanan: Rp200.000',
            'Uang kesehatan (tahunan): Rp150.000', 'Sewa almari (tahunan): Rp300.000', 'Kasur: Rp550.000',
            'Kegiatan ekstrakurikuler (tahunan): Rp150.000', 'Buku paket: Rp650.000', 'Iuran Pramuka (tahunan): Rp100.000', 'Iuran kertas (tahunan): Rp100.000'
          ]),
          awalTotal: String(biaya?.awalTotal || 'Rp4.100.000').trim() || 'Rp4.100.000',
          putraItems: normList(biaya?.putraItems, ['Kaos olahraga: Rp200.000', 'Seragam Tapak Suci: Rp160.000', '3 kemeja: Rp480.000']),
          putraTotal: String(biaya?.putraTotal || 'Rp840.000').trim() || 'Rp840.000',
          putriItems: normList(biaya?.putriItems, ['Kaos olahraga: Rp220.000', 'Seragam Tapak Suci: Rp160.000', 'Jubah toska: Rp190.000', 'Jubah biru: Rp160.000', 'Jilbab putih & coklat: Rp110.000']),
          putriTotal: String(biaya?.putriTotal || 'Rp840.000').trim() || 'Rp840.000',
          catatan: String(biaya?.catatan || 'Catatan: Harga sewaktu-waktu dapat berubah.').trim() || 'Catatan: Harga sewaktu-waktu dapat berubah.'
        }
      };

      await Settings.setSetting('ppsb_config', JSON.stringify(payload), 'Konfigurasi dinamis PPSB (timeline, status gelombang, biaya ujian)');
      res.json({ success: true, message: 'Pengaturan PPSB berhasil diupdate' });
    } catch (error) { res.status(500).json({ success:false, message:error.message }); }
  }

  // Kunci pengaturan situs yang boleh dibaca publik & diubah admin
  static siteKeys() {
    return ['site_identity', 'site_contact', 'site_social', 'site_seo', 'homepage', 'maintenance', 'navigation'];
  }

  static parseSiteValue(raw) {
    if (raw === null || raw === undefined) return null;
    if (typeof raw !== 'string') return raw;
    try { return JSON.parse(raw); } catch { return raw; }
  }

  // PUBLIK: semua pengaturan situs (termasuk status maintenance)
  async getSite(req, res) {
    try {
      const data = {};
      for (const key of SettingsController.siteKeys()) {
        const section = key.replace(/^site_/, '');
        data[section] = SettingsController.parseSiteValue(await Settings.getSetting(key));
      }
      res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }

  // ADMIN: update parsial per section, mis. { identity: {...}, maintenance: {...} }
  async updateSite(req, res) {
    try {
      const body = req.body || {};
      const allowed = {
        identity: 'site_identity',
        contact: 'site_contact',
        social: 'site_social',
        seo: 'site_seo',
        homepage: 'homepage',
        maintenance: 'maintenance',
        navigation: 'navigation',
      };
      const descriptions = {
        identity: 'Identitas situs (nama, tagline, logo, favicon, teks footer)',
        contact: 'Informasi kontak situs (alamat, telepon, email, jam, maps)',
        social: 'Tautan media sosial (facebook, instagram, youtube, whatsapp)',
        seo: 'Pengaturan SEO dasar situs',
        homepage: 'Konten homepage (slide hero kustom, judul & teks sambutan)',
        maintenance: 'Mode maintenance situs',
        navigation: 'Item navigasi utama (label, url, tampil/sembunyi, submenu)',
      };
      let updated = 0;
      for (const [section, key] of Object.entries(allowed)) {
        if (body[section] === undefined) continue;
        const val = body[section];
        if (val === null || typeof val !== 'object' || Array.isArray(val) && section !== 'navigation') {
          // navigation boleh array; section lain harus object
          if (!(section === 'navigation' && Array.isArray(val))) {
            return res.status(400).json({ success: false, message: `Format section "${section}" tidak valid` });
          }
        }
        if (section === 'maintenance') {
          const norm = {
            enabled: Boolean(val.enabled),
            message: String(val.message || 'Website sedang dalam pemeliharaan. Silakan kembali lagi beberapa saat lagi.').trim(),
          };
          await Settings.setSetting(key, JSON.stringify(norm), descriptions[section]);
        } else if (section === 'navigation') {
          const norm = val.slice(0, 12).map((item) => ({
            label: String(item?.label || '').trim().slice(0, 60),
            url: String(item?.url || '').trim().slice(0, 300),
            visible: item?.visible !== false,
            children: Array.isArray(item?.children) ? item.children.slice(0, 6).map((c) => ({
              label: String(c?.label || '').trim().slice(0, 60),
              url: String(c?.url || '').trim().slice(0, 300),
              visible: c?.visible !== false,
            })).filter((c) => c.label) : [],
          })).filter((item) => item.label);
          await Settings.setSetting(key, JSON.stringify(norm), descriptions[section]);
        } else {
          await Settings.setSetting(key, JSON.stringify(val), descriptions[section]);
        }
        updated++;
      }
      if (!updated) return res.status(400).json({ success: false, message: 'Tidak ada section yang diupdate' });
      res.json({ success: true, message: 'Pengaturan situs berhasil diupdate' });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
}

class TestimoniController {
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

  async getAll(req, res) {
    try {
      const includeUnpublished = req.query.all === '1';
      const data = await Testimonial.getAll({ includeUnpublished });
      res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }

  async saveAll(req, res) {
    try {
      const incoming = Array.isArray(req.body?.items) ? req.body.items : [];
      const normalized = incoming
        .map((item, idx) => this._normalizeItem(item, idx))
        .filter((item) => item.quote && item.name && item.role);

      const data = await Testimonial.replaceAll(normalized);
      res.json({ success: true, message: 'Testimoni berhasil disimpan', data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }

  async submit(req, res) {
    try {
      const payload = {
        quote: String(req.body?.quote || '').trim(),
        name: String(req.body?.name || '').trim(),
        role: String(req.body?.role || '').trim(),
        source: String(req.body?.source || 'Form website').trim(),
        year: String(req.body?.year || '').trim(),
      };

      if (!payload.quote || !payload.name || !payload.role) {
        return res.status(400).json({ success: false, message: 'Nama, peran, dan isi testimoni wajib diisi.' });
      }

      await Testimonial.createPending(payload);
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

      const data = await Testimonial.moderate(id, action);
      if (!data) return res.status(404).json({ success: false, message: 'Testimoni tidak ditemukan.' });

      res.json({ success: true, message: action === 'approve' ? 'Testimoni disetujui.' : 'Testimoni ditolak.', data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
}

export const galeriController = new GaleriController();
export const guruController = new GuruController();
export const pesanController = new PesanController();
export const pendaftaranController = new PendaftaranController();
export const settingsController = new SettingsController();
export const testimoniController = new TestimoniController();

class ProgramController {
  async getAll(req, res) {
    try {
      const limit = Math.min(Math.max(parseInt(req.query.limit || '0', 10) || 0, 0), 100);
      res.json({ success: true, data: await Program.getAll({ publishedOnly: true, limit }) });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
  async getAllAdmin(req, res) {
    try { res.json({ success: true, data: await Program.getAll({}) }); }
    catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
  async create(req, res) { try { res.status(201).json({ success: true, data: await Program.create(req.body) }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } }
  async update(req, res) { try { const item = await Program.update(req.params.id, req.body); if (!item) return res.status(404).json({ success: false, message: 'Program tidak ditemukan' }); res.json({ success: true, data: item }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } }
  async delete(req, res) { try { const ok = await Program.deleteById(req.params.id); if (!ok) return res.status(404).json({ success: false, message: 'Program tidak ditemukan' }); res.json({ success: true, message: 'Program berhasil dihapus' }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } }
}

class PrestasiController {
  async getAll(req, res) {
    try {
      const tahun = String(req.query.tahun || '').trim();
      const tingkat = String(req.query.tingkat || '').trim();
      res.json({ success: true, data: await Prestasi.getAll({ publishedOnly: true, tahun, tingkat }) });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
  async getAllAdmin(req, res) {
    try { res.json({ success: true, data: await Prestasi.getAll({}) }); }
    catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
  async create(req, res) { try { res.status(201).json({ success: true, data: await Prestasi.create(req.body) }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } }
  async update(req, res) { try { const item = await Prestasi.update(req.params.id, req.body); if (!item) return res.status(404).json({ success: false, message: 'Prestasi tidak ditemukan' }); res.json({ success: true, data: item }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } }
  async delete(req, res) { try { const ok = await Prestasi.deleteById(req.params.id); if (!ok) return res.status(404).json({ success: false, message: 'Prestasi tidak ditemukan' }); res.json({ success: true, message: 'Prestasi berhasil dihapus' }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } }
}

class PimpinanController {
  async getAll(req, res) {
    try {
      const limit = Math.min(Math.max(parseInt(req.query.limit || '0', 10) || 0, 0), 100);
      res.json({ success: true, data: await Pimpinan.getAll({ publishedOnly: true, limit }) });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
  async getAllAdmin(req, res) {
    try { res.json({ success: true, data: await Pimpinan.getAll({}) }); }
    catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
  async create(req, res) { try { res.status(201).json({ success: true, data: await Pimpinan.create(req.body) }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } }
  async update(req, res) { try { const item = await Pimpinan.update(req.params.id, req.body); if (!item) return res.status(404).json({ success: false, message: 'Data pimpinan tidak ditemukan' }); res.json({ success: true, data: item }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } }
  async delete(req, res) { try { const ok = await Pimpinan.deleteById(req.params.id); if (!ok) return res.status(404).json({ success: false, message: 'Data pimpinan tidak ditemukan' }); res.json({ success: true, message: 'Data pimpinan berhasil dihapus' }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } }
}

class FasilitasController {
  async getAll(req, res) {
    try {
      const limit = Math.min(Math.max(parseInt(req.query.limit || '0', 10) || 0, 0), 100);
      res.json({ success: true, data: await Fasilitas.getAll({ publishedOnly: true, limit }) });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
  async getAllAdmin(req, res) {
    try { res.json({ success: true, data: await Fasilitas.getAll({}) }); }
    catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
  async create(req, res) { try { res.status(201).json({ success: true, data: await Fasilitas.create(req.body) }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } }
  async update(req, res) { try { const item = await Fasilitas.update(req.params.id, req.body); if (!item) return res.status(404).json({ success: false, message: 'Fasilitas tidak ditemukan' }); res.json({ success: true, data: item }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } }
  async delete(req, res) { try { const ok = await Fasilitas.deleteById(req.params.id); if (!ok) return res.status(404).json({ success: false, message: 'Fasilitas tidak ditemukan' }); res.json({ success: true, message: 'Fasilitas berhasil dihapus' }); } catch (error) { res.status(500).json({ success: false, message: error.message }); } }
}

export const programController = new ProgramController();
export const prestasiController = new PrestasiController();
export const pimpinanController = new PimpinanController();
export const fasilitasController = new FasilitasController();

class KomentarBeritaController {
  async _getBeritaIdBySlug(slug) {
    const berita = await Berita.findBySlug(slug);
    return berita ? berita.id : null;
  }

  // Publik: daftar komentar yang sudah disetujui
  async getBySlug(req, res) {
    try {
      const beritaId = await this._getBeritaIdBySlug(req.params.slug);
      if (!beritaId) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
      const data = await KomentarBerita.getApproved(beritaId);
      res.json({ success: true, data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }

  // Publik: kirim komentar (selalu pending)
  async submit(req, res) {
    try {
      const beritaId = await this._getBeritaIdBySlug(req.params.slug);
      if (!beritaId) return res.status(404).json({ success: false, message: 'Berita tidak ditemukan' });
      const nama = String(req.body?.nama || '').trim();
      const isi = String(req.body?.isi || '').trim();
      const data = await KomentarBerita.createPending({ beritaId, nama, isi });
      res.status(201).json({ success: true, message: 'Komentar terkirim dan menunggu moderasi admin.', data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }

  async getAllAdmin(req, res) {
    try { res.json({ success: true, data: await KomentarBerita.getAllAdmin() }); }
    catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }

  async moderate(req, res) {
    try {
      const { id } = req.params;
      const action = String(req.body?.action || '').toLowerCase();
      if (!['approve', 'reject'].includes(action)) {
        return res.status(400).json({ success: false, message: 'Action tidak valid.' });
      }
      const data = await KomentarBerita.moderate(id, action);
      if (!data) return res.status(404).json({ success: false, message: 'Komentar tidak ditemukan.' });
      res.json({ success: true, message: action === 'approve' ? 'Komentar disetujui.' : 'Komentar ditolak.', data });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }

  async delete(req, res) {
    try {
      await KomentarBerita.deleteById(req.params.id);
      res.json({ success: true, message: 'Komentar berhasil dihapus' });
    } catch (error) { res.status(500).json({ success: false, message: error.message }); }
  }
}

export const komentarBeritaController = new KomentarBeritaController();
