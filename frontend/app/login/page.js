'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { showError, showLoading, closeLoading } from '@/lib/sweetalert';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      username: e.target.username.value,
      password: e.target.password.value
    };

    try {
      showLoading('Memproses login...');

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData)
      });

      let data = {};
      try {
        data = await response.json();
      } catch {
        // ignore invalid JSON, handled below
      }

      closeLoading();

      if (response.ok && data.success) {
        router.replace('/admin');
      } else {
        showError(data.message || 'Login gagal. Periksa username dan password Anda.');
      }
    } catch (error) {
      closeLoading();
      showError(`Terjadi kesalahan: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-16 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-4 py-10 lg:px-8">
        <div className="grid w-full overflow-hidden rounded-3xl border border-white/10 bg-white shadow-2xl lg:grid-cols-2">
          <section className="hidden bg-gradient-to-br from-slate-900 via-cyan-900 to-blue-900 p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs tracking-wide text-cyan-100">
                <i className="fas fa-shield-alt"></i>
                Admin Secure Access
              </p>
              <h1 className="text-3xl font-bold leading-tight">Pondok Pesantren Modern Darul Mukhlisin</h1>
              <p className="mt-4 text-sm text-slate-200">
                Selamat datang di panel admin. Kelola berita, galeri, data guru, pendaftaran, dan pesan dari satu dashboard.
              </p>
            </div>

            <div className="space-y-3 text-sm text-slate-200">
              <div className="flex items-start gap-3">
                <i className="fas fa-check-circle mt-0.5 text-cyan-300"></i>
                <p>Kontrol konten website secara terpusat</p>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-check-circle mt-0.5 text-cyan-300"></i>
                <p>Monitoring statistik dan pesan masuk real-time</p>
              </div>
              <div className="flex items-start gap-3">
                <i className="fas fa-check-circle mt-0.5 text-cyan-300"></i>
                <p>Akses aman berbasis autentikasi admin</p>
              </div>
            </div>
          </section>

          <section className="p-6 sm:p-10">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-8 text-center">
                <div className="mx-auto mb-4 grid h-20 w-20 place-items-center rounded-2xl bg-slate-100">
                  <Image src="/images/LOGO DMU.png" alt="Logo DMU" width={58} height={58} />
                </div>
                <h2 className="text-2xl font-bold text-slate-800">Masuk ke Admin Panel</h2>
                <p className="mt-1 text-sm text-slate-500">Gunakan akun admin yang terdaftar</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Username</label>
                  <div className="relative">
                    <i className="fas fa-user absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      name="username"
                      required
                      className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                      placeholder="Masukkan username"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Password</label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      name="password"
                      required
                      className="w-full rounded-xl border border-slate-300 py-3 pl-10 pr-4 text-slate-800 outline-none transition focus:border-cyan-500 focus:ring-4 focus:ring-cyan-100"
                      placeholder="Masukkan password"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 px-4 py-3 font-semibold text-white shadow-md transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-sign-in-alt"></i>}
                  {loading ? 'Memproses...' : 'Masuk'}
                </button>
              </form>

              <div className="mt-7 text-center">
                <a href="/" className="text-sm font-semibold text-cyan-700 hover:underline">
                  <i className="fas fa-arrow-left mr-2"></i>Kembali ke Beranda
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
