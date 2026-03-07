export const metadata = {
  title: 'Berita Pondok Pesantren Modern Darul Mukhlisin',
  description:
    'Kumpulan berita terbaru Pondok Pesantren Modern Darul Mukhlisin: kegiatan santri, prestasi, pengumuman, dan informasi pondok.',
  alternates: {
    canonical: 'https://darulmukhlisin.ponpes.id/berita',
  },
  openGraph: {
    title: 'Berita Pondok Pesantren Modern Darul Mukhlisin',
    description:
      'Update kegiatan, prestasi, pengumuman, dan informasi terbaru dari Pondok Pesantren Modern Darul Mukhlisin.',
    url: 'https://darulmukhlisin.ponpes.id/berita',
    type: 'website',
  },
};

export default function BeritaLayout({ children }) {
  return children;
}
