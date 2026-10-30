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
        key: 'site_identity',
        value: JSON.stringify({
          siteName: 'Pondok Pesantren Modern Darul Mukhlisin',
          siteNameArabic: 'معهد دار المخلصين لتربية الإسلامية الحديثة',
          tagline: 'Membangun generasi unggul: beradab, berilmu, dan siap menghadapi tantangan zaman.',
          logoUrl: '/images/LOGO DMU.png',
          faviconUrl: '/images/LOGO DMU.png',
          footerText: '©2026 Pondok Pesantren Modern Darul Mukhlisin. All rights reserved.'
        }),
        description: 'Identitas situs (nama, tagline, logo, favicon, teks footer)'
      },
      {
        key: 'site_contact',
        value: JSON.stringify({
          address: 'Kp. Kubang Sari RT/RW 02/05, Desa Tenjolaut, Kec. Cikalong Wetan, Kab. Bandung Barat, Jawa Barat 40395',
          phone: '(+62) 878-2527-9426',
          phoneLabel: 'Ahmad Saepudin',
          email: 'ponpesdarulmukhlisin15@gmail.com',
          hours: 'Senin - Jumat: 07.00 - 16.00 WIB',
          mapsUrl: 'https://maps.app.goo.gl/Wrjm7MmngSS7wQ9D6',
          mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15842.434893826946!2d107.412406!3d-6.7102039!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6903143308c765%3A0x4264f530a5f72332!2sPondok%20Pesantren%20Modern%20Darul%20Mukhlisin!5e0!3m2!1sid!2sid!4v1702000000000!5m2!1sid!2sid'
        }),
        description: 'Informasi kontak situs (alamat, telepon, email, jam, maps)'
      },
      {
        key: 'site_social',
        value: JSON.stringify({
          facebook: 'https://www.facebook.com/darulmukhlisin5715',
          instagram: 'https://www.instagram.com/darulmukhlisin.dmu/',
          youtube: 'https://youtube.com/channel/UC-5X6CUlwlG9J6jJSA8sAIw',
          whatsapp: '6287825279426'
        }),
        description: 'Tautan media sosial (facebook, instagram, youtube, whatsapp)'
      },
      {
        key: 'site_seo',
        value: JSON.stringify({
          defaultTitle: 'Pondok Pesantren Modern Darul Mukhlisin',
          defaultDescription: 'Membangun Generasi Unggul dengan Pendidikan Berkualitas dan Karakter Islami. Program KMI, Ihya Al-Quran, dan Life Skills.',
          keywords: 'pesantren, pondok pesantren, darul mukhlisin, pendidikan islam, KMI, tahfidz, bandung barat'
        }),
        description: 'Pengaturan SEO dasar situs'
      },
      {
        key: 'homepage',
        value: JSON.stringify({
          heroSlides: [],
          welcomeTitle: 'Selamat Datang di Pondok Pesantren Modern Darul Mukhlisin',
          welcomeText: 'Membangun generasi berilmu, berakhlak, dan siap menghadapi tantangan zaman melalui pendidikan Islam yang terarah.'
        }),
        description: 'Konten homepage (slide hero kustom, judul & teks sambutan). heroSlides kosong = pakai foto galeri terbaru seperti sekarang'
      },
      {
        key: 'maintenance',
        value: JSON.stringify({
          enabled: false,
          message: 'Website sedang dalam pemeliharaan. Silakan kembali lagi beberapa saat lagi.'
        }),
        description: 'Mode maintenance situs'
      },
      {
        key: 'navigation',
        value: JSON.stringify([
          { label: 'Beranda', url: '/#home', visible: true },
          { label: 'Profil', url: '/#profil', visible: true },
          { label: 'PPSB/Pendaftaran', url: '/ppsb', visible: true },
          { label: 'Berita', url: '/berita', visible: true },
          { label: 'Galeri', url: '/#galeri', visible: true },
          { label: 'Guru', url: '/#guru', visible: true },
          { label: 'Alumni', url: '', visible: true, children: [{ label: 'IKADM', url: 'https://wahyuadratama.github.io/website-ikadm/', visible: true }] },
          { label: 'Kontak', url: '/#kontak', visible: true }
        ]),
        description: 'Item navigasi utama (label, url, tampil/sembunyi, submenu)'
      },
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
