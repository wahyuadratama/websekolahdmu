'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { showSuccess, showError } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';

export default function SettingsPage() {
  const [stats, setStats] = useState({ siswa: 0, guru: 0, keahlian: 0, prestasi: 0 });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const res = await fetch(`${API_URL}/api/settings/stats`);
      const data = await res.json();
      if (data.success) setStats(data.data);
    } catch (error) {
      showError('Gagal memuat data statistik: ' + error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/api/settings/stats`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(stats),
      });

      const data = await res.json();
      if (data.success) {
        await showSuccess('Statistik berhasil diupdate!');
      } else {
        showError(data.message || 'Terjadi kesalahan');
      }
    } catch (error) {
      showError('Terjadi kesalahan: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout title="Pengaturan">
      <div>
        {/* Form Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Statistik Website</h3>
          <p className="text-gray-600 mb-6">
            Update angka statistik yang ditampilkan di halaman utama website
          </p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  <i className="fas fa-users text-blue-600 mr-2"></i>
                  Jumlah Santri Aktif
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={stats.siswa}
                  onChange={(e) => setStats({ ...stats, siswa: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  <i className="fas fa-chalkboard-teacher text-green-600 mr-2"></i>
                  Jumlah Guru/Asatidz
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={stats.guru}
                  onChange={(e) => setStats({ ...stats, guru: parseInt(e.target.value) || 0 })}
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  <i className="fas fa-book text-purple-600 mr-2"></i>
                  Jumlah Program Unggulan
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={stats.keahlian}
                  onChange={(e) =>
                    setStats({ ...stats, keahlian: parseInt(e.target.value) || 0 })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">
                  <i className="fas fa-trophy text-yellow-600 mr-2"></i>
                  Jumlah Prestasi
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={stats.prestasi}
                  onChange={(e) =>
                    setStats({ ...stats, prestasi: parseInt(e.target.value) || 0 })
                  }
                  className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/30 focus:border-cyan-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2 text-white hover:opacity-95 transition disabled:opacity-50"
            >
              <i className="fas fa-save mr-2"></i>
              {loading ? 'Menyimpan...' : 'Simpan Perubahan'}
            </button>
          </form>
        </div>

        {/* Preview Section */}
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Preview Statistik</h3>
          <p className="text-gray-600 mb-6">
            Tampilan statistik yang akan muncul di halaman utama website
          </p>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg text-center">
              <i className="fas fa-users text-4xl text-blue-600 mb-2"></i>
              <h4 className="text-3xl font-bold text-blue-600">{stats.siswa}</h4>
              <p className="text-gray-700 font-semibold">Santri Aktif</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg text-center">
              <i className="fas fa-chalkboard-teacher text-4xl text-green-600 mb-2"></i>
              <h4 className="text-3xl font-bold text-green-600">{stats.guru}</h4>
              <p className="text-gray-700 font-semibold">Asatidz/Asatidazah</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-lg text-center">
              <i className="fas fa-book text-4xl text-purple-600 mb-2"></i>
              <h4 className="text-3xl font-bold text-purple-600">{stats.keahlian}</h4>
              <p className="text-gray-700 font-semibold">Program Unggulan</p>
            </div>
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-lg text-center">
              <i className="fas fa-trophy text-4xl text-yellow-600 mb-2"></i>
              <h4 className="text-3xl font-bold text-yellow-600">{stats.prestasi}</h4>
              <p className="text-gray-700 font-semibold">Prestasi</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}




