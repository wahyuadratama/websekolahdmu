'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE, API_URL } from '@/lib/config';

export default function GaleriPage() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/galeri`)
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setGaleri(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error:', err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Galeri Kegiatan
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dokumentasi kegiatan dan fasilitas Pondok Pesantren Modern Darul Mukhlisin
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <p className="mt-4 text-gray-600">Memuat galeri...</p>
            </div>
          ) : galeri.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Belum ada foto tersedia.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galeri.map((item) => (
                <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition">
                  <div className="relative h-64">
                    <Image
                      src={`${API_URL}${item.url}`}
                      alt={item.judul}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.judul}</h3>
                    <p className="text-sm text-gray-600">{item.deskripsi || 'Dokumentasi kegiatan'}</p>
                    {item.kategori && (
                      <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                        {item.kategori}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
