'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE } from '@/lib/config';
import { resolveSiteImage } from '@/lib/siteSettings';

export default function ProgramPage() {
  const [program, setProgram] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/program`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProgram(data.data);
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
            <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              <i className="fas fa-star mr-2"></i>Program Unggulan
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Program Unggulan
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Program-program unggulan Pondok Pesantren Modern Darul Mukhlisin untuk membentuk
              santri yang berilmu, berakhlak, dan siap mengabdi.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Memuat program">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="h-56 bg-slate-200 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
                    <div className="h-3 w-2/3 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : program.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-star text-5xl text-slate-300 mb-4"></i>
              <p className="text-gray-600">Belum ada program yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {program.map((item, idx) => (
                <article
                  key={item.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-56 bg-gradient-to-br from-primary-500 to-primary-700">
                    {item.foto ? (
                      <Image
                        src={resolveSiteImage(item.foto, '')}
                        alt={item.judul}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center">
                        <i className="fas fa-star text-6xl text-white/30"></i>
                      </div>
                    )}
                    <span className="absolute top-4 left-4 w-10 h-10 rounded-2xl bg-white/90 text-primary-700 font-bold grid place-items-center shadow">
                      {idx + 1}
                    </span>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-800 mb-2">{item.judul}</h2>
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
