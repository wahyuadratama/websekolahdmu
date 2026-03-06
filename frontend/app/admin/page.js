'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { showError } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';

const statItems = [
  {
    key: 'berita',
    label: 'Total Berita',
    icon: 'fa-newspaper',
    href: '/admin/berita',
    iconWrap: 'bg-blue-100 text-blue-600',
    accent: 'text-blue-600',
    bgAccent: 'bg-blue-50'
  },
  {
    key: 'galeri',
    label: 'Total Galeri',
    icon: 'fa-images',
    href: '/admin/galeri',
    iconWrap: 'bg-purple-100 text-purple-600',
    accent: 'text-purple-600',
    bgAccent: 'bg-purple-50'
  },
  {
    key: 'guru',
    label: 'Total Guru',
    icon: 'fa-chalkboard-teacher',
    href: '/admin/guru',
    iconWrap: 'bg-emerald-100 text-emerald-600',
    accent: 'text-emerald-600',
    bgAccent: 'bg-emerald-50'
  },
  {
    key: 'pendaftaran',
    label: 'Pendaftar Baru',
    icon: 'fa-user-plus',
    href: '/admin/pendaftaran',
    iconWrap: 'bg-amber-100 text-amber-600',
    accent: 'text-amber-600',
    bgAccent: 'bg-amber-50'
  },
  {
    key: 'pesan',
    label: 'Pesan Belum Dibaca',
    icon: 'fa-envelope',
    href: '/admin/pesan',
    iconWrap: 'bg-rose-100 text-rose-600',
    accent: 'text-rose-600',
    bgAccent: 'bg-rose-50',
    badge: true
  }
];

const quickMenus = [
  {
    href: '/admin/berita',
    title: 'Kelola Berita',
    subtitleKey: 'berita',
    subtitleSuffix: 'berita tersedia',
    icon: 'fa-newspaper',
    iconWrap: 'bg-blue-100 text-blue-600'
  },
  {
    href: '/admin/galeri',
    title: 'Kelola Galeri',
    subtitleKey: 'galeri',
    subtitleSuffix: 'foto tersedia',
    icon: 'fa-images',
    iconWrap: 'bg-purple-100 text-purple-600'
  },
  {
    href: '/admin/guru',
    title: 'Kelola Guru',
    subtitleKey: 'guru',
    subtitleSuffix: 'guru terdaftar',
    icon: 'fa-chalkboard-teacher',
    iconWrap: 'bg-emerald-100 text-emerald-600'
  },
  {
    href: '/admin/pesan',
    title: 'Lihat Pesan',
    subtitleKey: 'pesan',
    subtitleSuffix: 'pesan belum dibaca',
    icon: 'fa-envelope',
    iconWrap: 'bg-rose-100 text-rose-600',
    showBadge: true
  },
  {
    href: '/admin/pendaftaran',
    title: 'Data Pendaftaran',
    subtitleKey: 'pendaftaran',
    subtitleSuffix: 'pendaftar baru',
    icon: 'fa-user-plus',
    iconWrap: 'bg-amber-100 text-amber-600'
  },
  {
    href: '/admin/settings',
    title: 'Pengaturan',
    subtitleKey: null,
    subtitleSuffix: 'Update statistik website',
    icon: 'fa-cog',
    iconWrap: 'bg-slate-100 text-slate-700'
  }
];

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    berita: 0,
    galeri: 0,
    guru: 0,
    pendaftaran: 0,
    pesan: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [berita, galeri, guru, pendaftaran, pesan] = await Promise.all([
        fetch(`${API_URL}/api/berita`).then((r) => r.json()),
        fetch(`${API_URL}/api/galeri`).then((r) => r.json()),
        fetch(`${API_URL}/api/guru`).then((r) => r.json()),
        fetch(`${API_URL}/api/pendaftaran`, { credentials: 'include' }).then((r) => r.json()),
        fetch(`${API_URL}/api/pesan`, { credentials: 'include' }).then((r) => r.json())
      ]);

      setStats({
        berita: berita.data?.length || 0,
        galeri: galeri.data?.length || 0,
        guru: guru.data?.length || 0,
        pendaftaran: pendaftaran.data?.length || 0,
        pesan: pesan.data?.filter((p) => p.status === 'unread').length || 0
      });
    } catch (error) {
      showError('Gagal memuat statistik: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-14 w-14 rounded-2xl bg-white shadow-md grid place-items-center">
            <i className="fas fa-spinner fa-spin text-2xl text-cyan-600"></i>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <section className="mb-6 rounded-2xl bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 p-7 text-white shadow-lg">
        <p className="mb-2 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-medium">
          <i className="fas fa-sparkles"></i>
          Ringkasan Hari Ini
        </p>
        <h2 className="text-2xl font-bold tracking-tight">Selamat Datang di Admin Panel DMU</h2>
        <p className="mt-2 text-blue-100">Monitor statistik dan kelola seluruh konten website dari satu tempat.</p>
      </section>

      <section className="mb-8">
        <h3 className="mb-4 text-lg font-bold text-slate-800">Statistik Overview</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {statItems.map((item) => {
            const value = stats[item.key] || 0;

            return (
              <Link
                key={item.key}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className={`absolute -right-6 -top-6 h-24 w-24 rounded-full ${item.bgAccent} opacity-70 transition group-hover:opacity-100`} />

                <div className="relative">
                  <div className="mb-4 flex items-center justify-between">
                    <div className={`grid h-11 w-11 place-items-center rounded-xl ${item.iconWrap}`}>
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    {item.badge && value > 0 && (
                      <span className="rounded-full bg-rose-500 px-2 py-1 text-xs font-bold text-white">{value}</span>
                    )}
                  </div>

                  <p className="text-sm text-slate-500">{item.label}</p>
                  <p className={`mt-1 text-3xl font-bold ${item.accent}`}>{value}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h3 className="mb-4 text-lg font-bold text-slate-800">Menu Navigasi</h3>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="divide-y divide-slate-100">
            {quickMenus.map((menu) => {
              const value = menu.subtitleKey ? stats[menu.subtitleKey] || 0 : null;
              const subtitle = menu.subtitleKey ? `${value} ${menu.subtitleSuffix}` : menu.subtitleSuffix;

              return (
                <Link
                  key={menu.href}
                  href={menu.href}
                  className="group flex items-center justify-between p-4 transition hover:bg-slate-50"
                >
                  <div className="flex items-center gap-4">
                    <div className={`relative grid h-10 w-10 place-items-center rounded-lg ${menu.iconWrap}`}>
                      <i className={`fas ${menu.icon}`}></i>
                      {menu.showBadge && stats.pesan > 0 && (
                        <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-rose-500 text-[10px] font-bold text-white">
                          {stats.pesan}
                        </span>
                      )}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800">{menu.title}</p>
                      <p className="text-sm text-slate-500">{subtitle}</p>
                    </div>
                  </div>

                  <i className="fas fa-chevron-right text-slate-300 transition group-hover:text-slate-500"></i>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </AdminLayout>
  );
}
