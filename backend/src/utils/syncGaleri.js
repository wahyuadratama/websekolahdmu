import database from '../config/database.js';

async function syncGaleri() {
  try {
    await database.connect();
    await database.query('DELETE FROM galeri');

    const galeriData = [
      { judul: 'Kegiatan Pesantren 1', deskripsi: 'Dokumentasi kegiatan Pondok Pesantren Modern Darul Mukhlisin', url: '/uploads/b1.jpg' },
      { judul: 'Kegiatan Pesantren 2', deskripsi: 'Dokumentasi kegiatan Pondok Pesantren Modern Darul Mukhlisin', url: '/uploads/b2.jpg' },
      { judul: 'Kegiatan Pesantren 3', deskripsi: 'Dokumentasi kegiatan Pondok Pesantren Modern Darul Mukhlisin', url: '/uploads/b3.jpg' }
    ];

    for (const item of galeriData) {
      await database.query('INSERT INTO galeri (judul,deskripsi,url,kategori) VALUES (?,?,?,?)', [item.judul, item.deskripsi, item.url, 'Umum']);
    }

    console.log('✅ Sync galeri selesai');
    await database.disconnect();
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

syncGaleri();
