import Galeri from '../models/Galeri.js';
import Guru from '../models/Guru.js';
import Pesan from '../models/Pesan.js';
import Pendaftaran from '../models/Pendaftaran.js';
import Settings from '../models/Settings.js';

class GaleriController {
  async getAll(req, res) {
    try { res.json({ success: true, data: await Galeri.getAll() }); }
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
  async getAll(req, res) { try { res.json({ success:true, data: await Guru.getAll({ activeOnly: true }) }); } catch (error) { res.status(500).json({ success:false, message:error.message }); } }
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
      const guru = await Settings.getSetting('stats_guru') || 85;
      const keahlian = await Settings.getSetting('stats_keahlian') || 15;
      const prestasi = await Settings.getSetting('stats_prestasi') || 50;
      res.json({ success:true, data:{ siswa, guru, keahlian, prestasi } });
    } catch (error) { res.status(500).json({ success:false, message:error.message }); }
  }
  async updateStats(req, res) {
    try {
      const { siswa, guru, keahlian, prestasi } = req.body;
      if (siswa !== undefined) await Settings.setSetting('stats_siswa', siswa);
      if (guru !== undefined) await Settings.setSetting('stats_guru', guru);
      if (keahlian !== undefined) await Settings.setSetting('stats_keahlian', keahlian);
      if (prestasi !== undefined) await Settings.setSetting('stats_prestasi', prestasi);
      res.json({ success:true, message:'Statistik berhasil diupdate' });
    } catch (error) { res.status(500).json({ success:false, message:error.message }); }
  }
}

export const galeriController = new GaleriController();
export const guruController = new GuruController();
export const pesanController = new PesanController();
export const pendaftaranController = new PendaftaranController();
export const settingsController = new SettingsController();
