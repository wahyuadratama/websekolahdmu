'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE } from '@/lib/config';
import { resolveSiteImage } from '@/lib/siteSettings';

function PimpinanCard({ item, featured = false }) {
  return (
    <div
      className={`bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow ${
        featured ? 'max-w-md mx-auto' : ''
      }`}
    >
      <div className={`relative bg-gradient-to-br from-primary-500 to-primary-700 ${featured ? 'h-80' : 'h-64'}`}>
        {item.foto ? (
          <Image
            src={resolveSiteImage(item.foto, '')}
            alt={item.nama}
            fill
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <i className="fas fa-user-tie text-6xl text-white/30"></i>
          </div>
        )}
      </div>
      <div className="p-6 text-center">
        <h2 className={`${featured ? 'text-2xl' : 'text-lg'} font-bold text-gray-800`}>{item.nama}</h2>
        <p className="text-primary-600 font-semibold text-sm mt-1 mb-3">{item.jabatan}</p>
        {item.bioSingkat && (
          <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">{item.bioSingkat}</p>
        )}
      </div>
    </div>
  );
}

export default function PimpinanPage() {
  const [pimpinan, setPimpinan] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/pimpinan`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPimpinan(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const top = pimpinan.length > 0 ? pimpinan[0] : null;
  const rest = pimpinan.length > 1 ? pimpinan.slice(1) : [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              <i className="fas fa-user-tie mr-2"></i>Pimpinan
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Pimpinan &amp; Struktur Organisasi
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Para pimpinan dan pengurus Pondok Pesantren Modern Darul Mukhlisin.
            </p>
          </div>

          {loading ? (
            <div className="space-y-8" aria-label="Memuat pimpinan">
              <div className="max-w-md mx-auto bg-white rounded-3xl shadow-xl overflow-hidden">
                <div className="h-80 bg-slate-200 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-5 w-1/2 bg-slate-200 rounded animate-pulse mx-auto" />
                  <div className="h-3 w-1/3 bg-slate-100 rounded animate-pulse mx-auto" />
                </div>
              </div>
            </div>
          ) : pimpinan.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-user-tie text-5xl text-slate-300 mb-4"></i>
              <p className="text-gray-600">Belum ada data pimpinan yang dipublikasikan.</p>
            </div>
          ) : (
            <div>
              {/* Pimpinan utama */}
              {top && (
                <div className="mb-4">
                  <PimpinanCard item={top} featured />
                </div>
              )}

              {/* Bagan struktur sederhana */}
              {rest.length > 0 && (
                <div>
                  <div className="flex justify-center">
                    <div className="w-px h-10 bg-slate-300" aria-hidden="true"></div>
                  </div>
                  <h2 className="text-center text-lg font-bold text-gray-700 mb-8">
                    <i className="fas fa-sitemap mr-2 text-primary-500"></i>
                    Jajaran Pengurus
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-6xl mx-auto">
                    {rest.map((item) => (
                      <PimpinanCard key={item.id} item={item} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
