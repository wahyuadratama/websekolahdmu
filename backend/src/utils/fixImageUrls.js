import database from '../config/database.js';

async function fixUrls() {
  try {
    await database.connect();
    const rows = await database.query('SELECT id, url FROM galeri');
    let fixed = 0;

    for (const row of rows) {
      if (row.url && row.url.includes('://')) {
        const parsed = new URL(row.url);
        await database.query('UPDATE galeri SET url = ? WHERE id = ?', [parsed.pathname, row.id]);
        fixed++;
      }
    }

    console.log(`✅ Fixed ${fixed} URLs`);
    await database.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

fixUrls();
