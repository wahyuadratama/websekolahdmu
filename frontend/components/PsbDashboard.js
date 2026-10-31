'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { API_URL } from '@/lib/config';
import { showError } from '@/lib/sweetalert';

const BULAN_SINGKAT = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];

function monthLabel(ym) {
  // '2026-10' -> 'Okt 26'
  const m = String(ym || '').match(/^(\d{4})-(\d{2})$/);
  if (!m) return ym;
  const bi = parseInt(m[2], 10) - 1;
  return `${BULAN_SINGKAT[bi] || m[2]} ${m[1].slice(2)}`;
}

export default function PsbDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch(`${API_URL}/api/pendaftaran/stats`, { credentials: 'include' });
        const json = await res.json();
        if (json.success) setStats(json.data);
        else showError(json.message || 'Gagal memuat statistik PSB');
      } catch (e) {
        showError('Gagal memuat statistik PSB: ' + e.message);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white shadow-md">
          <i className="fas fa-spinner fa-spin text-2xl text-cyan-600"></i>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const { total, byStatus, byGender } = stats;
  const byMonth = stats.byMonth || [];
  const maxMonth = Math.max(1, ...byMonth.map((m) => m.count));
  const totalGender = byGender['Laki-laki'] + byGender['Perempuan'];
  const pctL = totalGender ? Math.round((byGender['Laki-laki'] / totalGender) * 100) : 0;
  const pctP = totalGender ? Math.round((byGender['Perempuan'] / totalGender) * 100) : 0;

  const cards = [
    { label: 'Total Pendaftar', value: total, icon: 'fa-users', wrap: 'bg-blue-100 text-blue-600', accent: 'text-blue-600' },
    { label: 'Menunggu Verifikasi', value: byStatus.pending, icon: 'fa-hourglass-half', wrap: 'bg-amber-100 text-amber-600', accent: 'text-amber-600' },
    { label: 'Terverifikasi', value: byStatus.verified, icon: 'fa-circle-check', wrap: 'bg-emerald-100 text-emerald-600', accent: 'text-emerald-600' },
    { label: 'Ditolak', value: byStatus.rejected, icon: 'fa-circle-xmark', wrap: 'bg-rose-100 text-rose-600', accent: 'text-rose-600' },
  ];

  return (
    <>
      <section className="mb-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 p-7 text-white shadow-lg">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
          <i className="fas fa-chart-line"></i>
          Analisis PSB
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard Pendaftaran Santri Baru</h2>
        <p className="mt-2 text-teal-100">Pantau perkembangan pendaftar dan status verifikasi dari satu tempat.</p>
      </section>

      <section className="mb-8">
        <h3 className="mb-4 text-lg font-bold text-slate-800">Ringkasan Pendaftar</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c) => (
            <div key={c.label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div className={`grid h-11 w-11 place-items-center rounded-xl ${c.wrap}`}>
                  <i className={`fas ${c.icon}`}></i>
                </div>
              </div>
              <p className="text-sm text-slate-500">{c.label}</p>
              <p className={`mt-1 text-3xl font-bold ${c.accent}`}>{c.value}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-slate-800">Jenis Kelamin</h3>
          <div className="mb-3 flex h-6 overflow-hidden rounded-full bg-slate-100">
            <div className="bg-blue-500 transition-all" style={{ width: `${pctL}%` }} title={`Laki-laki: ${byGender['Laki-laki']}`} />
            <div className="bg-pink-400 transition-all" style={{ width: `${pctP}%` }} title={`Perempuan: ${byGender['Perempuan']}`} />
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-slate-600">
              <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
              Laki-laki <strong className="text-slate-800">{byGender['Laki-laki']}</strong> ({pctL}%)
            </span>
            <span className="flex items-center gap-2 text-slate-600">
              <span className="inline-block h-3 w-3 rounded-full bg-pink-400"></span>
              Perempuan <strong className="text-slate-800">{byGender['Perempuan']}</strong> ({pctP}%)
            </span>
          </div>
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-bold text-slate-800">Tren Pendaftar (6 Bulan Terakhir)</h3>
          {byMonth.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-400">Belum ada data pendaftaran.</p>
          ) : (
            <div className="flex h-40 items-end justify-around gap-2">
              {byMonth.map((m) => (
                <div key={m.month} className="flex h-full flex-1 flex-col items-center justify-end gap-1" title={`${monthLabel(m.month)}: ${m.count}`}>
                  <span className="text-xs font-semibold text-slate-600">{m.count}</span>
                  <div
                    className="w-full max-w-[48px] rounded-t-lg bg-gradient-to-t from-teal-600 to-cyan-400 transition-all"
                    style={{ height: `${Math.max(4, (m.count / maxMonth) * 100)}%` }}
                  />
                  <span className="text-[11px] text-slate-500">{monthLabel(m.month)}</span>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <section className="mt-6">
        <Link
          href="/admin/pendaftaran"
          className="group flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:bg-slate-50"
        >
          <div className="flex items-center gap-4">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-amber-100 text-amber-600">
              <i className="fas fa-user-plus"></i>
            </div>
            <div>
              <p className="font-semibold text-slate-800">Kelola Data Pendaftar</p>
              <p className="text-sm text-slate-500">Verifikasi dan kelola {byStatus.pending} pendaftar menunggu</p>
            </div>
          </div>
          <i className="fas fa-chevron-right text-slate-300 transition group-hover:text-slate-500"></i>
        </Link>
      </section>
    </>
  );
}
