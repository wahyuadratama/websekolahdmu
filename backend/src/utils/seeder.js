import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import database from '../config/database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const beritaData = [
  { judul: 'Penerimaan Santri Baru Tahun Ajaran 2025/2026', kategori: 'Pengumuman', status: 'published', author: 'Admin', excerpt: 'Pendaftaran santri baru telah dibuka untuk tahun ajaran 2025/2026', konten: '<p>Pondok Pesantren Modern Darul Mukhlisin membuka pendaftaran santri baru untuk tahun ajaran 2025/2026. Pendaftaran dapat dilakukan secara online melalui website resmi kami.</p>', gambar: '/uploads/b1.jpg', tags: JSON.stringify([]) },
  { judul: 'Prestasi Santri dalam Lomba Tahfidz Tingkat Nasional', kategori: 'Prestasi', status: 'published', author: 'Admin', excerpt: 'Santri kami meraih juara 1 dalam lomba tahfidz tingkat nasional', konten: '<p>Alhamdulillah, santri Pondok Pesantren Modern Darul Mukhlisin berhasil meraih juara 1 dalam lomba tahfidz Al-Quran 30 juz tingkat nasional yang diselenggarakan di Jakarta.</p>', gambar: '/uploads/b2.jpg', tags: JSON.stringify([]) },
  { judul: 'Kegiatan Ramadhan 1446 H', kategori: 'Kegiatan', status: 'published', author: 'Admin', excerpt: 'Berbagai kegiatan menarik di bulan Ramadhan', konten: '<p>Menyambut bulan suci Ramadhan 1446 H, pesantren kami mengadakan berbagai kegiatan seperti tadarus bersama, kajian tafsir, dan berbagai lomba islami.</p>', gambar: '/uploads/b3.jpg', tags: JSON.stringify([]) }
];

const galeriData = [
  { judul: 'Gedung Utama Pesantren', deskripsi: 'Gedung utama Pondok Pesantren Modern Darul Mukhlisin', url: '/uploads/poto 1.jpg', kategori: 'Fasilitas' },
  { judul: 'Kegiatan Belajar Mengajar', deskripsi: 'Suasana belajar mengajar di kelas', url: '/uploads/poto 2.jpg', kategori: 'Kegiatan' },
  { judul: 'Masjid Pesantren', deskripsi: 'Masjid sebagai pusat kegiatan ibadah', url: '/uploads/masjid.JPG', kategori: 'Fasilitas' }
];

const guruData = [
  { nama: 'Ustadz Ahmad Fauzi, S.Pd.I', nip: '1234567890', mapel: 'Tahfidz Al-Quran', pendidikan: 'S1 Pendidikan Agama Islam', status: 'aktif' },
  { nama: 'Ustadzah Siti Nurhaliza, S.Pd', nip: '1234567891', mapel: 'Bahasa Arab', pendidikan: 'S1 Pendidikan Bahasa Arab', status: 'aktif' },
  { nama: 'Ustadz Muhammad Ridwan, Lc', nip: '1234567892', mapel: 'Fiqih', pendidikan: 'S1 Syariah', status: 'aktif' },
  { nama: 'Ustadzah Fatimah Az-Zahra, S.Pd.I', nip: '1234567893', mapel: 'Akidah Akhlak', pendidikan: 'S1 Pendidikan Agama Islam', status: 'aktif' }
];

async function seed() {
  try {
    await database.connect();
    await database.query('DELETE FROM berita');
    await database.query('DELETE FROM galeri');
    await database.query('DELETE FROM guru');

    for (const b of beritaData) {
      const slug = b.judul.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      await database.query('INSERT INTO berita (judul,slug,kategori,status,author,excerpt,konten,gambar,tags) VALUES (?,?,?,?,?,?,?,?,?)', [b.judul, slug, b.kategori, b.status, b.author, b.excerpt, b.konten, b.gambar, b.tags]);
    }
    for (const g of galeriData) {
      await database.query('INSERT INTO galeri (judul,deskripsi,url,kategori) VALUES (?,?,?,?)', [g.judul, g.deskripsi, g.url, g.kategori]);
    }
    for (const g of guruData) {
      await database.query('INSERT INTO guru (nama,nip,mapel,pendidikan,status) VALUES (?,?,?,?,?)', [g.nama, g.nip, g.mapel, g.pendidikan, g.status]);
    }

    console.log('✅ Seed selesai');
    await database.disconnect();
    process.exit(0);
  } catch (e) {
    console.error('❌ Seed gagal', e.message);
    process.exit(1);
  }
}
seed();
