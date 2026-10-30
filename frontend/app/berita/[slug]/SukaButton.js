'use client';

import { useState, useEffect } from 'react';
import { API_BASE } from '@/lib/config';

export default function SukaButton({ slug, initialCount = 0 }) {
  const [count, setCount] = useState(initialCount);
  const [liked, setLiked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [popping, setPopping] = useState(false);

  const storageKey = `berita-suka-${slug}`;

  useEffect(() => {
    try {
      if (localStorage.getItem(storageKey) === '1') setLiked(true);
    } catch { /* abaikan */ }
  }, [storageKey]);

  const handleSuka = async () => {
    if (liked || loading) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/berita/${slug}/suka`, { method: 'POST' });
      const data = await res.json();
      if (data?.success) {
        setCount(data.data.count);
        setLiked(true);
        try { localStorage.setItem(storageKey, '1'); } catch { /* abaikan */ }
        setPopping(true);
        setTimeout(() => setPopping(false), 400);
      }
    } catch (err) {
      console.error('Gagal menyukai:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSuka}
      disabled={liked || loading}
      aria-label={liked ? 'Anda menyukai artikel ini' : 'Sukai artikel ini'}
      className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-all ${
        liked
          ? 'bg-rose-100 text-rose-600 cursor-default'
          : 'bg-white border border-slate-200 text-slate-600 hover:border-rose-300 hover:text-rose-600 hover:shadow-md'
      } ${popping ? 'suka-pop' : ''}`}
    >
      <i className={`${liked ? 'fas' : 'far'} fa-heart text-lg`}></i>
      <span>{count} {count === 1 ? 'Suka' : 'Suka'}</span>
      <style jsx>{`
        .suka-pop {
          animation: sukaPop 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }
        @keyframes sukaPop {
          0% { transform: scale(1); }
          40% { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
      `}</style>
    </button>
  );
}
