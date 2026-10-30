'use client';

import { useState, useEffect } from 'react';
import { API_BASE } from '@/lib/config';
import { formatTanggalID } from '@/lib/format';

export default function KomentarSection({ slug }) {
  const [komentar, setKomentar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [nama, setNama] = useState('');
  const [isi, setIsi] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/berita/${slug}/komentar`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.data)) setKomentar(data.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    const namaTrim = nama.trim();
    const isiTrim = isi.trim();
    if (namaTrim.length < 3 || namaTrim.length > 100) {
      setError('Nama harus 3-100 karakter.');
      return;
    }
    if (isiTrim.length < 3 || isiTrim.length > 1000) {
      setError('Komentar harus 3-1000 karakter.');
      return;
    }
    setSending(true);
    try {
      const res = await fetch(`${API_BASE}/berita/${slug}/komentar`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nama: namaTrim, isi: isiTrim }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.message || 'Gagal mengirim komentar.');
      setNama('');
      setIsi('');
      setSent(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold mb-6">
        Komentar <span className="text-gray-500 text-lg font-normal">({komentar.length})</span>
      </h2>

      {/* Daftar komentar */}
      {loading ? (
        <div className="space-y-4 mb-8">
          {[0, 1].map((i) => (
            <div key={i} className="bg-white rounded-xl p-5 shadow-sm space-y-2">
              <div className="h-4 w-1/4 bg-slate-200 rounded animate-pulse" />
              <div className="h-3 w-full bg-slate-100 rounded animate-pulse" />
            </div>
          ))}
        </div>
      ) : komentar.length === 0 ? (
        <div className="bg-white rounded-xl p-6 text-center text-gray-500 mb-8 shadow-sm">
          <i className="far fa-comments text-3xl mb-2 text-gray-300"></i>
          <p>Belum ada komentar. Jadilah yang pertama berkomentar!</p>
        </div>
      ) : (
        <div className="space-y-4 mb-8">
          {komentar.map((k) => (
            <div key={k.id} className="bg-white rounded-xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-700 font-bold grid place-items-center shrink-0">
                  {(k.nama || '?').charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{k.nama}</p>
                  <p className="text-xs text-gray-500">{formatTanggalID(k.createdAt)}</p>
                </div>
              </div>
              <p className="text-gray-700 whitespace-pre-line">{k.isi}</p>
            </div>
          ))}
        </div>
      )}

      {/* Form komentar */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-lg font-bold mb-4">Tulis Komentar</h3>
        {sent ? (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-amber-800">
            <i className="fas fa-hourglass-half mr-2"></i>
            Terima kasih! Komentar Anda <b>menunggu moderasi admin</b> sebelum ditampilkan.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="komentar-nama" className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
              <input
                id="komentar-nama"
                type="text"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Nama Anda"
                maxLength={100}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label htmlFor="komentar-isi" className="block text-sm font-medium text-gray-700 mb-1">Komentar</label>
              <textarea
                id="komentar-isi"
                value={isi}
                onChange={(e) => setIsi(e.target.value)}
                placeholder="Tulis komentar Anda..."
                rows={4}
                maxLength={1000}
                className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            {error && (
              <p className="text-sm text-rose-600"><i className="fas fa-exclamation-circle mr-1"></i>{error}</p>
            )}
            <button
              type="submit"
              disabled={sending}
              className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
            >
              {sending ? 'Mengirim...' : (<><i className="fas fa-paper-plane mr-2"></i>Kirim Komentar</>)}
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
