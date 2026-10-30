'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE } from '@/lib/config';

export default function FaqPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openId, setOpenId] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/faq`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setItems(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id));

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-20">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <span className="inline-block bg-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide mb-4">
              <i className="fas fa-question-circle mr-2"></i>FAQ
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Pertanyaan Umum
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Jawaban atas pertanyaan yang sering ditanyakan seputar Pondok Pesantren Modern Darul Mukhlisin.
            </p>
          </div>

          {loading ? (
            <div className="space-y-3" aria-label="Memuat FAQ">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow p-5">
                  <div className="h-4 w-3/4 bg-slate-200 rounded animate-pulse" />
                </div>
              ))}
            </div>
          ) : items.length === 0 ? (
            <div className="text-center py-20">
              <i className="fas fa-question-circle text-5xl text-slate-300 mb-4"></i>
              <p className="text-gray-600">Belum ada pertanyaan yang dipublikasikan.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => {
                const open = openId === item.id;
                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-2xl shadow transition border ${open ? 'border-primary-200' : 'border-transparent'}`}
                  >
                    <button
                      onClick={() => toggle(item.id)}
                      aria-expanded={open}
                      className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-4 sm:py-5"
                    >
                      <span className="font-semibold text-slate-800">{item.pertanyaan}</span>
                      <span className={`shrink-0 w-8 h-8 rounded-full grid place-items-center transition-colors ${open ? 'bg-primary-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                        <i className={`fas fa-chevron-down text-xs transition-transform duration-300 ${open ? 'rotate-180' : ''}`}></i>
                      </span>
                    </button>
                    <div
                      className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
                    >
                      <div className="overflow-hidden">
                        <p className="px-5 sm:px-6 pb-5 text-slate-600 leading-relaxed whitespace-pre-line">
                          {item.jawaban}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
