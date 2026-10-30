'use client';

import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE } from '@/lib/config';
import { resolveSiteImage } from '@/lib/siteSettings';

const TINGKAT_OPTIONS = [
  { value: '', label: 'Semua Tingkat' },
  { value: 'sekolah', label: 'Sekolah' },
  { value: 'kabupaten', label: 'Kabupaten' },
  { value: 'provinsi', label: 'Provinsi' },
  { value: 'nasional', label: 'Nasional' },
  { value: 'internasional', label: 'Internasional' },
];

const TINGKAT_BADGE = {
  sekolah: 'bg-slate-100 text-slate-700',
  kabupaten: 'bg-blue-100 text-blue-700',
  provinsi: 'bg-emerald-100 text-emerald-700',
  nasional: 'bg-amber-100 text-amber-700',
  internasional: 'bg-purple-100 text-purple-700',
};

export default function PrestasiPage() {
  const [prestasi, setPrestasi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterTahun, setFilterTahun] = useState('');
  const [filterTingkat, setFilterTingkat] = useState('');

  useEffect(() => {
    fetch(`${API_BASE}/prestasi`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setPrestasi(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const tahunList = useMemo(() => {
    const set = new Set(prestasi.map((p) => p.tahun).filter(Boolean));
    return Array.from(set).sort().reverse();
  }, [prestasi]);

  const filtered = useMemo(
    () =>
      prestasi.filter(
        (p) =>
          (!filterTahun || p.tahun === filterTahun) &&
          (!filterTingkat || p.tingkat === filterTingkat)
      ),
    [prestasi, filterTahun, filterTingkat]
  );

  const selectCls =
    'rounded-xl border border-slate-300 px-4 py-2.5 text-sm text-slate-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500';

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-amber-100 text-amber-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              <i className="fas fa-trophy mr-2"></i>Prestasi
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Prestasi Santri
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Deretan prestasi yang diraih santri Pondok Pesantren Modern Darul Mukhlisin
              di berbagai tingkat kompetisi.
            </p>
          </div>

          {/* Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            <select value={filterTahun} onChange={(e) => setFilterTahun(e.target.value)} className={selectCls} aria-label="Filter tahun">
              <option value="">Semua Tahun</option>
              {tahunList.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <select value={filterTingkat} onChange={(e) => setFilterTingkat(e.target.value)} className={selectCls} aria-label="Filter tingkat">
              {TINGKAT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
            {(filterTahun || filterTingkat) && (
              <button
                onClick={() => { setFilterTahun(''); setFilterTingkat(''); }}
                className="rounded-xl px-4 py-2.5 text-sm font-semibold text-slate-600 hover:text-slate-900"
              >
                <i className="fas fa-times mr-1"></i>Reset
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" aria-label="Memuat prestasi">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-xl overflow-hidden">
                  <div className="h-52 bg-slate-200 animate-pulse" />
                  <div className="p-6 space-y-3">
                    <div className="h-5 w-3/4 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-trophy text-5xl text-slate-300 mb-4"></i>
              <p className="text-gray-600">
                {prestasi.length === 0
                  ? 'Belum ada prestasi yang dipublikasikan.'
                  : 'Tidak ada prestasi yang cocok dengan filter.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative h-52 bg-gradient-to-br from-amber-400 to-amber-600">
                    {item.foto ? (
                      <Image
                        src={resolveSiteImage(item.foto, '')}
                        alt={item.judul}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center">
                        <i className="fas fa-trophy text-6xl text-white/30"></i>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full capitalize ${TINGKAT_BADGE[item.tingkat] || TINGKAT_BADGE.sekolah}`}>
                        <i className="fas fa-medal mr-1"></i>{item.tingkat}
                      </span>
                      {item.tahun && (
                        <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-semibold rounded-full">
                          <i className="fas fa-calendar mr-1"></i>{item.tahun}
                        </span>
                      )}
                    </div>
                    <h2 className="text-lg font-bold text-gray-800 mb-2">{item.judul}</h2>
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
