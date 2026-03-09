import database from '../config/database.js';

class Settings {
  static async getSetting(key) {
    const rows = await database.query('SELECT value_text FROM settings WHERE `key`=? LIMIT 1', [key]);
    if (!rows[0]) return null;
    const val = rows[0].value_text;
    const maybeNum = Number(val);
    return Number.isNaN(maybeNum) ? val : maybeNum;
  }

  static async setSetting(key, value, description = '') {
    await database.query(
      'INSERT INTO settings (`key`, value_text, description) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE value_text=VALUES(value_text), description=VALUES(description)',
      [key, String(value), description]
    );
  }

  static async initializeDefaults() {
    const defaults = [
      { key: 'stats_siswa', value: 1200, description: 'Jumlah santri aktif' },
      { key: 'stats_pendaftar', value: 0, description: 'Jumlah pendaftar baru' },
      { key: 'stats_guru', value: 85, description: 'Jumlah guru/ustadz' },
      { key: 'stats_keahlian', value: 15, description: 'Jumlah program unggulan' },
      { key: 'stats_prestasi', value: 50, description: 'Jumlah prestasi' },
      {
        key: 'ppsb_config',
        value: JSON.stringify({
          timeline: [
            { tanggal: '1 November 2025', nama: 'Pembukaan Pendaftaran Santri Baru', status: 'Buka' },
            { tanggal: '8 Februari 2026', nama: 'Ujian Masuk Gelombang Pertama', status: 'Buka' },
            { tanggal: '7 Juni 2026', nama: 'Ujian Masuk Gelombang Kedua', status: 'Buka' },
            { tanggal: '12 Juli 2026', nama: 'Penutupan Pendaftaran', status: 'Segera' }
          ],
          biayaUjian: 'Rp150.000',
          biaya: {
            awalItems: [
              'Uang pangkal masuk KMI: Rp1.500.000',
              'Uang makan bulanan: Rp400.000',
              'Iuran sekolah dan asrama bulanan: Rp200.000',
              'Uang kesehatan (tahunan): Rp150.000',
              'Sewa almari (tahunan): Rp300.000',
              'Kasur: Rp550.000',
              'Kegiatan ekstrakurikuler (tahunan): Rp150.000',
              'Buku paket: Rp650.000',
              'Iuran Pramuka (tahunan): Rp100.000',
              'Iuran kertas (tahunan): Rp100.000'
            ],
            awalTotal: 'Rp4.100.000',
            putraItems: ['Kaos olahraga: Rp200.000', 'Seragam Tapak Suci: Rp160.000', '3 kemeja: Rp480.000'],
            putraTotal: 'Rp840.000',
            putriItems: ['Kaos olahraga: Rp220.000', 'Seragam Tapak Suci: Rp160.000', 'Jubah toska: Rp190.000', 'Jubah biru: Rp160.000', 'Jilbab putih & coklat: Rp110.000'],
            putriTotal: 'Rp840.000',
            catatan: 'Catatan: Harga sewaktu-waktu dapat berubah.'
          }
        }),
        description: 'Konfigurasi dinamis PPSB (timeline, status gelombang, biaya ujian, biaya administrasi)'
      }
    ];

    for (const def of defaults) {
      const exists = await this.getSetting(def.key);
      if (exists === null || exists === undefined) {
        await this.setSetting(def.key, def.value, def.description);
      }
    }
    console.log('✅ Default settings initialized');
  }
}

export default Settings;
