'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE, API_URL } from '@/lib/config';

function fileUrl(path) {
  if (!path) return '#';
  if (/^https?:\/\//i.test(path)) return path;
  return `${API_URL}${path.startsWith('/') ? path : `/${path}`}`;
}

function fileIcon(filename = '') {
  const ext = filename.split('.').pop()?.toLowerCase() || '';
  if (ext === 'pdf') return 'fa-file-pdf text-red-500';
  if (['doc', 'docx'].includes(ext)) return 'fa-file-word text-blue-500';
  if (['xls', 'xlsx'].includes(ext)) return 'fa-file-excel text-emerald-500';
  if (['ppt', 'pptx'].includes(ext)) return 'fa-file-powerpoint text-orange-500';
  return 'fa-file-alt text-slate-400';
}

export default function UnduhanPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/unduhan`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setItems(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const groups = items.reduce((acc, item) => {
    const kat = item.kategori || 'Umum';
    if (!acc[kat]) acc[kat] = [];
    acc[kat].push(item);
    return acc;
  }, {});

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              <i className="fas fa-download mr-2"></i>Unduhan
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Unduhan
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Unduh brosur, formulir, dan dokumen resmi Pondok Pesantren Modern Darul Mukhlisin.
            </p>
          </div>

          {loading ? (
            <div className="space-y-4" aria-label="Memuat unduhan">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow p-5 flex items-center gap-4">
                  <div className="h-12 w-12 bg-slate-200 rounded-xl animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-2/3 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-download text-5xl text-slate-300 mb-4"></i>
              <p className="text-gray-600">Belum ada dokumen yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="space-y-10">
              {Object.entries(groups).map(([kategori, list]) => (
                <section key={kategori}>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <i className="fas fa-folder-open text-primary-600"></i>{kategori}
                  </h2>
                  <div className="space-y-3">
                    {list.map((item) => (
                      <article
                        key={item.id}
                        className="bg-white rounded-2xl shadow hover:shadow-lg transition p-5 flex items-center gap-4"
                      >
                        <div className="h-12 w-12 rounded-xl bg-slate-50 grid place-items-center shrink-0">
                          <i className={`fas ${fileIcon(item.fileUrl)} text-2xl`}></i>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="font-bold text-gray-800 truncate">{item.judul}</h3>
                          {item.deskripsi && (
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">{item.deskripsi}</p>
                          )}
                        </div>
                        <a
                          href={fileUrl(item.fileUrl)}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 inline-flex items-center gap-2 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-700 transition"
                        >
                          <i className="fas fa-download"></i>
                          <span className="hidden sm:inline">Unduh</span>
                        </a>
                      </article>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
