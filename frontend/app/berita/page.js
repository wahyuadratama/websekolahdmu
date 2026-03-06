'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE, API_URL } from '@/lib/config';

export default function BeritaListPage() {
  const [berita, setBerita] = useState([]);
  const [filteredBerita, setFilteredBerita] = useState([]);
  const [selectedKategori, setSelectedKategori] = useState('Semua');
  const [loading, setLoading] = useState(true);

  const kategoris = ['Semua', 'Akademik', 'Prestasi', 'Kegiatan', 'Pengumuman', 'Info', 'Beasiswa'];

  useEffect(() => {
    loadBerita();
  }, []);

  useEffect(() => {
    if (selectedKategori === 'Semua') {
      setFilteredBerita(berita);
    } else {
      setFilteredBerita(berita.filter((item) => item.kategori === selectedKategori));
    }
  }, [selectedKategori, berita]);

  const loadBerita = async () => {
    try {
      const res = await fetch(`${API_BASE}/berita?status=published`);
      const data = await res.json();
      if (data.success) {
        setBerita(data.data);
        setFilteredBerita(data.data);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20 min-h-screen bg-gray-50">
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-10 sm:py-12 md:py-16">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">Berita & Artikel</h1>
            <p className="mt-3 text-sm sm:text-base md:text-lg text-blue-100 max-w-2xl mx-auto">
              Informasi terkini seputar Pondok Pesantren Darul Mukhlisin
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
          <div className="-mx-4 px-4 sm:mx-0 sm:px-0 mb-6 overflow-x-auto">
            <div className="flex w-max sm:w-auto gap-2 sm:gap-3 sm:flex-wrap sm:justify-center">
              {kategoris.map((kategori) => (
                <button
                  key={kategori}
                  onClick={() => setSelectedKategori(kategori)}
                  className={`shrink-0 px-4 sm:px-5 py-2 rounded-full text-sm sm:text-base font-semibold transition ${
                    selectedKategori === kategori
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {kategori}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4 sm:mb-6 text-sm sm:text-base text-gray-600">Menampilkan {filteredBerita.length} berita</div>

          {loading ? (
            <div className="text-center py-12">
              <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
              <p className="mt-4 text-gray-600">Memuat berita...</p>
            </div>
          ) : filteredBerita.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-newspaper text-5xl sm:text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600">Belum ada berita untuk kategori ini.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
              {filteredBerita.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative w-full aspect-[16/9] bg-gray-100">
                    <Image
                      src={
                        item.gambar
                          ? item.gambar.startsWith('http')
                            ? item.gambar
                            : `${API_URL}${item.gambar}`
                          : `${API_URL}/uploads/masjid.JPG`
                      }
                      alt={item.judul}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-4 sm:p-5">
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="text-xs sm:text-sm text-blue-600 font-semibold line-clamp-1">{item.kategori}</span>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        <i className="fas fa-eye mr-1"></i>
                        {item.views || 0}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold mb-2 sm:mb-3 hover:text-blue-600 transition line-clamp-2">
                      {item.judul}
                    </h3>

                    <p className="text-sm sm:text-[15px] text-gray-600 mb-3 sm:mb-4 line-clamp-3">
                      {item.excerpt || item.konten.replace(/<[^>]*>/g, '').substring(0, 120)}...
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1.5 sm:gap-2 text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center gap-2 min-w-0">
                        <i className="fas fa-user text-xs"></i>
                        <span className="line-clamp-1">{item.author || 'Admin'}</span>
                      </div>
                      <div className="flex items-center gap-2 whitespace-nowrap">
                        <i className="fas fa-calendar text-xs"></i>
                        <span>{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>

                    <div className="mt-3 sm:mt-4 text-blue-600 font-semibold text-sm">
                      Baca Selengkapnya <i className="fas fa-arrow-right ml-1"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
