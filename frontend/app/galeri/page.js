'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE, API_URL } from '@/lib/config';

export default function GaleriPage() {
  const [galeri, setGaleri] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStartX = useRef(null);

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

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const showPrev = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev - 1 + galeri.length) % galeri.length));
  }, [galeri.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((prev) => (prev === null ? null : (prev + 1) % galeri.length));
  }, [galeri.length]);

  // Kunci scroll body + keyboard saat lightbox terbuka
  useEffect(() => {
    if (lightboxIndex === null) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [lightboxIndex, closeLightbox, showPrev, showNext]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 50) showPrev();
    else if (dx < -50) showNext();
    touchStartX.current = null;
  };

  const active = lightboxIndex !== null ? galeri[lightboxIndex] : null;

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
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6" aria-label="Memuat galeri">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <div className="h-64 bg-slate-200 animate-pulse" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                    <div className="h-3 w-1/2 bg-slate-100 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : galeri.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Belum ada foto tersedia.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {galeri.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setLightboxIndex(idx)}
                  className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-lg transition text-left cursor-zoom-in group"
                  aria-label={`Lihat foto: ${item.judul}`}
                >
                  <div className="relative h-64">
                    <Image
                      src={`${API_URL}${item.url}`}
                      alt={item.judul}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition flex items-center justify-center">
                      <i className="fas fa-search-plus text-white text-2xl opacity-0 group-hover:opacity-100 transition"></i>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.judul}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{item.deskripsi || 'Dokumentasi kegiatan'}</p>
                    {item.kategori && (
                      <span className="inline-block mt-2 px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full">
                        {item.kategori}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 lightbox-fade"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label={`Pratinjau foto: ${active.judul}`}
        >
          {/* Tombol tutup */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-10 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 text-white grid place-items-center transition"
            aria-label="Tutup pratinjau"
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          {/* Penomoran */}
          <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/80 text-sm font-medium tracking-wide">
            {lightboxIndex + 1} / {galeri.length}
          </div>

          {/* Panah kiri */}
          {galeri.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); showPrev(); }}
              className="absolute left-2 md:left-6 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/25 text-white grid place-items-center transition"
              aria-label="Foto sebelumnya"
            >
              <i className="fas fa-chevron-left text-xl"></i>
            </button>
          )}

          {/* Foto + caption */}
          <div
            className="lightbox-zoom max-w-4xl w-full"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black">
              <img
                key={active.id}
                src={`${API_URL}${active.url}`}
                alt={active.judul}
                className="w-full max-h-[75vh] object-contain"
              />
            </div>
            <div className="mt-4 text-center px-2">
              <h3 className="text-white text-lg md:text-xl font-semibold">{active.judul}</h3>
              {active.deskripsi && (
                <p className="text-white/70 text-sm mt-1 max-w-2xl mx-auto">{active.deskripsi}</p>
              )}
            </div>
          </div>

          {/* Panah kanan */}
          {galeri.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); showNext(); }}
              className="absolute right-2 md:right-6 z-10 w-12 h-12 md:w-14 md:h-14 rounded-full bg-white/10 hover:bg-white/25 text-white grid place-items-center transition"
              aria-label="Foto berikutnya"
            >
              <i className="fas fa-chevron-right text-xl"></i>
            </button>
          )}
        </div>
      )}

      <style jsx>{`
        .lightbox-fade {
          animation: lbFade 0.25s ease-out;
        }
        .lightbox-zoom {
          animation: lbZoom 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes lbFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lbZoom {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </>
  );
}
