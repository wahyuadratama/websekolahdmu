'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE } from '@/lib/config';
import { resolveSiteImage } from '@/lib/siteSettings';

export default function FasilitasPage() {
  const [fasilitas, setFasilitas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/fasilitas`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setFasilitas(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block bg-emerald-100 text-emerald-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              <i className="fas fa-building mr-2"></i>Fasilitas
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Fasilitas &amp; Sarana Prasarana
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Sarana dan prasarana Pondok Pesantren Modern Darul Mukhlisin untuk menunjang
              kegiatan belajar dan kehidupan santri.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Memuat fasilitas">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="h-56 bg-slate-200 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : fasilitas.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-building text-5xl text-slate-300 mb-4"></i>
              <p className="text-gray-600">Belum ada fasilitas yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {fasilitas.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-56 bg-gradient-to-br from-emerald-400 to-emerald-600">
                    {item.foto ? (
                      <Image
                        src={resolveSiteImage(item.foto, '')}
                        alt={item.nama}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center">
                        <i className="fas fa-building text-6xl text-white/30"></i>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">
                      <i className="fas fa-check-circle text-emerald-500 mr-2"></i>
                      {item.nama}
                    </h2>
                    {item.deskripsi && (
                      <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                        {item.deskripsi}
                      </p>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
