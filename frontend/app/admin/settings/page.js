'use client';

import { useState, useEffect } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { showSuccess, showError } from '@/lib/sweetalert';
import { API_URL } from '@/lib/config';

export default function SettingsPage() {
  const [stats, setStats] = useState({ siswa: 0, pendaftar: 0, guru: 0, keahlian: 0, prestasi: 0 });
  const [initialStats, setInitialStats] = useState({ siswa: 0, pendaftar: 0, guru: 0, keahlian: 0, prestasi: 0 });
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setInitialLoading(true);
      const res = await fetch(`${API_URL}/api/settings/stats`);
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
        setInitialStats(data.data);
      } else {
        showError(data.message || 'Gagal memuat data statistik');
      }
    } catch (error) {
      showError('Gagal memuat data statistik: ' + error.message);
    } finally {
      setInitialLoading(false);
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
        setInitialStats(stats);
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

  const isDirty = JSON.stringify(stats) !== JSON.stringify(initialStats);

  return (
    <AdminLayout title="Pengaturan">
      <div>
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Statistik Website</h3>
          <p className="text-gray-600 mb-6">Update angka statistik yang ditampilkan di halaman utama website</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            {initialLoading && (
              <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-sm text-blue-700">
                Memuat data statistik terbaru...
              </div>
            )}
            <fieldset disabled={loading || initialLoading} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold"><i className="fas fa-users text-blue-600 mr-2"></i>Jumlah Santri Aktif</label>
                  <input type="number" required min="0" value={stats.siswa} onChange={(e) => setStats({ ...stats, siswa: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold"><i className="fas fa-user-plus text-indigo-600 mr-2"></i>Jumlah Pendaftar Baru</label>
                  <input type="number" required min="0" value={stats.pendaftar} onChange={(e) => setStats({ ...stats, pendaftar: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold"><i className="fas fa-chalkboard-teacher text-green-600 mr-2"></i>Jumlah Guru/Asatidz</label>
                  <input type="number" required min="0" value={stats.guru} onChange={(e) => setStats({ ...stats, guru: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold"><i className="fas fa-book text-purple-600 mr-2"></i>Jumlah Program Unggulan</label>
                  <input type="number" required min="0" value={stats.keahlian} onChange={(e) => setStats({ ...stats, keahlian: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold"><i className="fas fa-trophy text-yellow-600 mr-2"></i>Jumlah Prestasi</label>
                  <input type="number" required min="0" value={stats.prestasi} onChange={(e) => setStats({ ...stats, prestasi: parseInt(e.target.value) || 0 })} className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm" />
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <button type="submit" disabled={loading || !isDirty} className="rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 px-6 py-2 text-white disabled:opacity-50">
                  <i className="fas fa-save mr-2"></i>{loading ? 'Menyimpan...' : 'Simpan Perubahan'}
                </button>
                <button type="button" onClick={() => setStats(initialStats)} disabled={loading || !isDirty} className="rounded-lg border border-slate-300 px-5 py-2 text-slate-700 disabled:opacity-50">Reset</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </AdminLayout>
  );
}
