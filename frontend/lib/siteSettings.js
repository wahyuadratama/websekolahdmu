import { API_URL } from './config';

// Nilai default — sama dengan default backend (Settings.initializeDefaults).
// Dipakai sebagai fallback bila API gagal / key belum ada.
export const DEFAULT_SITE_SETTINGS = {
  identity: {
    siteName: 'Pondok Pesantren Modern Darul Mukhlisin',
    siteNameArabic: 'معهد دار المخلصين لتربية الإسلامية الحديثة',
    tagline: 'Membangun generasi unggul: beradab, berilmu, dan siap menghadapi tantangan zaman.',
    logoUrl: '/images/LOGO DMU.png',
    faviconUrl: '/images/LOGO DMU.png',
    footerText: '©2026 Pondok Pesantren Modern Darul Mukhlisin. All rights reserved.',
  },
  contact: {
    address: 'Kp. Kubang Sari RT/RW 02/05, Desa Tenjolaut, Kec. Cikalong Wetan, Kab. Bandung Barat, Jawa Barat 40395',
    phone: '(+62) 878-2527-9426',
    phoneLabel: 'Ahmad Saepudin',
    email: 'ponpesdarulmukhlisin15@gmail.com',
    hours: 'Senin - Jumat: 07.00 - 16.00 WIB',
    mapsUrl: 'https://maps.app.goo.gl/Wrjm7MmngSS7wQ9D6',
    mapsEmbed: 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15842.434893826946!2d107.412406!3d-6.7102039!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6903143308c765%3A0x4264f530a5f72332!2sPondok%20Pesantren%20Modern%20Darul%20Mukhlisin!5e0!3m2!1sid!2sid!4v1702000000000!5m2!1sid!2sid',
  },
  social: {
    facebook: 'https://www.facebook.com/darulmukhlisin5715',
    instagram: 'https://www.instagram.com/darulmukhlisin.dmu/',
    youtube: 'https://youtube.com/channel/UC-5X6CUlwlG9J6jJSA8sAIw',
    whatsapp: '6287825279426',
  },
  seo: {
    defaultTitle: 'Pondok Pesantren Modern Darul Mukhlisin',
    defaultDescription: 'Membangun Generasi Unggul dengan Pendidikan Berkualitas dan Karakter Islami. Program KMI, Ihya Al-Quran, dan Life Skills.',
    keywords: 'pesantren, pondok pesantren, darul mukhlisin, pendidikan islam, KMI, tahfidz, bandung barat',
  },
  homepage: {
    heroSlides: [],
    welcomeTitle: 'Selamat Datang di Pondok Pesantren Modern Darul Mukhlisin',
    welcomeText: 'Membangun generasi berilmu, berakhlak, dan siap menghadapi tantangan zaman melalui pendidikan Islam yang terarah.',
  },
  maintenance: {
    enabled: false,
    message: 'Website sedang dalam pemeliharaan. Silakan kembali lagi beberapa saat lagi.',
  },
  navigation: [
    { label: 'Beranda', url: '/#home', visible: true },
    { label: 'Profil', url: '/#profil', visible: true },
    { label: 'PPSB/Pendaftaran', url: '/ppsb', visible: true },
    { label: 'Berita', url: '/berita', visible: true },
    { label: 'Galeri', url: '/#galeri', visible: true },
    { label: 'Guru', url: '/#guru', visible: true },
    { label: 'Alumni', url: '', visible: true, children: [{ label: 'IKADM', url: 'https://wahyuadratama.github.io/website-ikadm/', visible: true }] },
    { label: 'Kontak', url: '/#kontak', visible: true },
  ],
};

export async function getSiteSettings() {
  try {
    const res = await fetch(`${API_URL}/api/settings/site`, { cache: 'no-store' });
    const data = await res.json();
    if (!data?.success || !data.data) return DEFAULT_SITE_SETTINGS;
    const merged = { ...DEFAULT_SITE_SETTINGS };
    for (const key of Object.keys(DEFAULT_SITE_SETTINGS)) {
      if (data.data[key] !== null && data.data[key] !== undefined) {
        merged[key] = Array.isArray(DEFAULT_SITE_SETTINGS[key])
          ? (Array.isArray(data.data[key]) ? data.data[key] : DEFAULT_SITE_SETTINGS[key])
          : { ...DEFAULT_SITE_SETTINGS[key], ...data.data[key] };
      }
    }
    return merged;
  } catch {
    return DEFAULT_SITE_SETTINGS;
  }
}

// URL gambar: dukung path relatif (/uploads/...) maupun URL penuh maupun path lokal (/images/...)
export function resolveSiteImage(url, fallback) {
  if (!url) return fallback;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/images/')) return url;
  if (url.startsWith('/')) return `${API_URL}${url}`;
  return url;
}
