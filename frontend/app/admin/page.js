'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import AdminLayout from '@/components/AdminLayout';
import { colors } from '@/lib/designSystem';
import { showError } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';

export default function AdminDashboard() {
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadStats();
  }, [router]);

  const loadStats = async () => {
    try {
      const [berita, galeri, guru, pendaftaran, pesan] = await Promise.all([
        fetch(`${API_URL}/api/berita`).then((r) => r.json()),
        fetch(`${API_URL}/api/galeri`).then((r) => r.json()),
        fetch(`${API_URL}/api/guru`).then((r) => r.json()),
        fetch(`${API_URL}/api/pendaftaran`, {
          credentials: 'include',
        }).then((r) => r.json()),
        fetch(`${API_URL}/api/pesan`, {
          credentials: 'include',
        }).then((r) => r.json()),
      ]);

      setStats({
        berita: berita.data?.length || 0,
        galeri: galeri.data?.length || 0,
        guru: guru.data?.length || 0,
        pendaftaran: pendaftaran.data?.length || 0,
        pesan: pesan.data?.filter((p) => p.status === 'unread').length || 0,
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
        <div className="flex items-center justify-center py-12">
          <i className="fas fa-spinner fa-spin text-4xl" style={{ color: colors.primary }}></i>
        </div>
      </AdminLayout>
    );
  }

  const statItems = [
    { label: 'Total Berita', value: stats.berita, icon: 'fa-newspaper', color: 'blue', href: '/admin/berita' },
    { label: 'Total Galeri', value: stats.galeri, icon: 'fa-images', color: 'purple', href: '/admin/galeri' },
    { label: 'Total Guru', value: stats.guru, icon: 'fa-chalkboard-teacher', color: 'green', href: '/admin/guru' },
    { label: 'Pendaftar Baru', value: stats.pendaftaran, icon: 'fa-user-plus', color: 'orange', href: '/admin/pendaftaran' },
    { label: 'Pesan Belum Dibaca', value: stats.pesan, icon: 'fa-envelope', color: 'red', href: '/admin/pesan', badge: stats.pesan > 0 },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl mb-6">
        <h2 className="text-2xl font-bold mb-2">Selamat Datang di Admin Panel!</h2>
        <p className="text-blue-100">Kelola konten website pesantren dengan mudah dan efisien</p>
      </div>

      {/* Statistics Overview */}
      <div className="mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Statistik Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {statItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100 relative overflow-hidden group"
            >
              <div className={`absolute top-0 right-0 w-20 h-20 bg-${item.color}-50 rounded-bl-full opacity-50 group-hover:opacity-100 transition-opacity`}></div>
              <div className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-12 h-12 rounded-lg bg-${item.color}-100 flex items-center justify-center`}>
                    <i className={`fas ${item.icon} text-${item.color}-600 text-xl`}></i>
                  </div>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.value}
                    </span>
                  )}
                </div>
                <p className="text-gray-500 text-sm mb-1">{item.label}</p>
                <p className={`text-3xl font-bold text-${item.color}-600`}>{item.value}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Menu Navigasi */}
      <div>
        <h3 className="text-lg font-bold text-gray-800 mb-4">Menu Navigasi</h3>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="divide-y divide-gray-100">
            <Link href="/admin/berita" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                  <i className="fas fa-newspaper text-blue-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Kelola Berita</p>
                  <p className="text-sm text-gray-500">{stats.berita} berita tersedia</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400 group-hover:text-gray-600"></i>
            </Link>
            <Link href="/admin/galeri" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                  <i className="fas fa-images text-purple-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Kelola Galeri</p>
                  <p className="text-sm text-gray-500">{stats.galeri} foto tersedia</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400 group-hover:text-gray-600"></i>
            </Link>
            <Link href="/admin/guru" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                  <i className="fas fa-chalkboard-teacher text-green-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Kelola Guru</p>
                  <p className="text-sm text-gray-500">{stats.guru} guru terdaftar</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400 group-hover:text-gray-600"></i>
            </Link>
            <Link href="/admin/pesan" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center relative">
                  <i className="fas fa-envelope text-red-600"></i>
                  {stats.pesan > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                      {stats.pesan}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Lihat Pesan</p>
                  <p className="text-sm text-gray-500">{stats.pesan} pesan belum dibaca</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400 group-hover:text-gray-600"></i>
            </Link>
            <Link href="/admin/pendaftaran" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                  <i className="fas fa-user-plus text-orange-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Data Pendaftaran</p>
                  <p className="text-sm text-gray-500">{stats.pendaftaran} pendaftar baru</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400 group-hover:text-gray-600"></i>
            </Link>
            <Link href="/admin/settings" className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors group">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                  <i className="fas fa-cog text-gray-600"></i>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Pengaturan</p>
                  <p className="text-sm text-gray-500">Update statistik website</p>
                </div>
              </div>
              <i className="fas fa-chevron-right text-gray-400 group-hover:text-gray-600"></i>
            </Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
