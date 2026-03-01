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
      { key: 'stats_guru', value: 85, description: 'Jumlah guru/ustadz' },
      { key: 'stats_keahlian', value: 15, description: 'Jumlah program unggulan' },
      { key: 'stats_prestasi', value: 50, description: 'Jumlah prestasi' }
    ];

    for (const def of defaults) {
      await this.setSetting(def.key, def.value, def.description);
    }
    console.log('✅ Default settings initialized');
  }
}

export default Settings;
