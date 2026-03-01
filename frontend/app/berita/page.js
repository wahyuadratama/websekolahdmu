'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE } from '@/lib/config';

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
      setFilteredBerita(berita.filter(item => item.kategori === selectedKategori));
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
      <main className="pt-20 min-h-screen bg-gray-50">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Berita & Artikel</h1>
            <p className="text-xl text-blue-100">Informasi terkini seputar Pondok Pesantren Darul Mukhlisin</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          {/* Filter */}
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            {kategoris.map((kategori) => (
              <button
                key={kategori}
                onClick={() => setSelectedKategori(kategori)}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  selectedKategori === kategori
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {kategori}
              </button>
            ))}
          </div>

          {/* Results Count */}
          <div className="mb-6 text-gray-600">
            Menampilkan {filteredBerita.length} berita
          </div>

          {/* Berita Grid */}
          {loading ? (
            <div className="text-center py-12">
              <i className="fas fa-spinner fa-spin text-4xl text-blue-600"></i>
              <p className="mt-4 text-gray-600">Memuat berita...</p>
            </div>
          ) : filteredBerita.length === 0 ? (
            <div className="text-center py-12">
              <i className="fas fa-newspaper text-6xl text-gray-300 mb-4"></i>
              <p className="text-gray-600">Belum ada berita untuk kategori ini.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {filteredBerita.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <Image
                    src={item.gambar || 'https://via.placeholder.com/400x250'}
                    alt={item.judul}
                    width={400}
                    height={250}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm text-blue-600 font-semibold">{item.kategori}</span>
                      <span className="text-xs text-gray-500">
                        <i className="fas fa-eye mr-1"></i>{item.views || 0}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 hover:text-blue-600 transition line-clamp-2">
                      {item.judul}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {item.excerpt || item.konten.replace(/<[^>]*>/g, '').substring(0, 120)}...
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <i className="fas fa-user text-xs"></i>
                        <span>{item.author || 'Admin'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <i className="fas fa-calendar text-xs"></i>
                        <span>{new Date(item.createdAt).toLocaleDateString('id-ID')}</span>
                      </div>
                    </div>
                    <div className="mt-4 text-blue-600 font-semibold text-sm">
                      Baca Selengkapnya <i className="fas fa-arrow-right ml-1"></i>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
