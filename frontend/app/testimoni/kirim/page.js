'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { API_BASE } from '@/lib/config';
import { showError, showSuccess } from '@/lib/sweetalert';

export default function KirimTestimoniPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const payload = {
      name: form.name.value,
      role: form.role.value,
      source: form.source.value,
      year: form.year.value,
      quote: form.quote.value,
    };

    try {
      const res = await fetch(`${API_BASE}/testimoni/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.message || 'Gagal mengirim testimoni.');
      showSuccess('Terima kasih! Testimoni Anda sudah terkirim dan menunggu verifikasi admin.');
      form.reset();
    } catch (err) {
      showError(err.message || 'Terjadi kesalahan saat mengirim testimoni.');
    } finally {
      setLoading(false);
    }
  };

  const shareUrl = 'https://darulmukhlisin.ponpes.id/testimoni/kirim';

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      showSuccess('Link form testimoni berhasil disalin.');
    } catch {
      showError('Gagal menyalin link. Silakan copy manual.');
    }
  };

  return (
    <>
      <Navbar />
      <main className="pt-16 sm:pt-20 min-h-screen bg-slate-50">
        <section className="bg-gradient-to-r from-blue-700 to-indigo-900 py-10 sm:py-14 text-white">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">Kirim Testimoni</h1>
            <p className="mt-3 text-sm sm:text-base text-blue-100">Bagikan pengalaman Anda bersama Pondok Pesantren Modern Darul Mukhlisin.</p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
          <div className="mb-4 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
            Testimoni yang masuk akan melalui verifikasi admin sebelum ditampilkan di website.
          </div>

          <div className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <span className="text-sm text-slate-600">Bagikan form ini:</span>
            <code className="rounded bg-slate-100 px-2 py-1 text-xs">{shareUrl}</code>
            <button onClick={copyLink} className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">Salin Link</button>
          </div>

          <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input name="name" required placeholder="Nama/Inisial" className="rounded-lg border px-3 py-2" />
              <input name="role" required placeholder="Peran (Wali Santri/Santri/Alumni)" className="rounded-lg border px-3 py-2" />
              <input name="source" placeholder="Sumber (Wawancara/Forum/Survey)" className="rounded-lg border px-3 py-2" />
              <input name="year" placeholder="Tahun" className="rounded-lg border px-3 py-2" />
            </div>

            <textarea name="quote" required rows={5} placeholder="Tulis testimoni Anda" className="w-full rounded-lg border px-3 py-2" />

            <div className="flex flex-wrap gap-3">
              <button type="submit" disabled={loading} className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 disabled:opacity-60">
                {loading ? 'Mengirim...' : 'Kirim Testimoni'}
              </button>
              <Link href="/" className="rounded-lg border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50">Kembali ke Beranda</Link>
            </div>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
}
