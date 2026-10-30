'use client';

import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { API_URL } from '@/lib/config';
import { showError, showSuccess } from '@/lib/sweetalert';
import { formatTanggalJamID } from '@/lib/format';

export default function AdminKomentarPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('pending');

  const loadData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/komentar-berita/admin`, { credentials: 'include' });
      const data = await res.json();
      if (data?.success && Array.isArray(data?.data)) setItems(data.data);
    } catch (err) {
      showError(`Gagal memuat komentar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const moderate = async (id, action) => {
    try {
      const res = await fetch(`${API_URL}/api/komentar-berita/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.message || 'Gagal moderasi');
      setItems((prev) => prev.map((it) => (it.id === id ? data.data : it)));
      showSuccess(action === 'approve' ? 'Komentar disetujui' : 'Komentar ditolak');
    } catch (err) {
      showError(err.message || 'Gagal memoderasi komentar');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus komentar ini secara permanen?')) return;
    try {
      const res = await fetch(`${API_URL}/api/komentar-berita/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.message || 'Gagal menghapus');
      setItems((prev) => prev.filter((it) => it.id !== id));
      showSuccess('Komentar dihapus');
    } catch (err) {
      showError(err.message || 'Gagal menghapus komentar');
    }
  };

  const filtered = useMemo(() => {
    if (tab === 'all') return items;
    return items.filter((it) => (it.status || 'pending') === tab);
  }, [items, tab]);

  const counts = useMemo(() => ({
    pending: items.filter((it) => it.status === 'pending').length,
    approved: items.filter((it) => it.status === 'approved').length,
    rejected: items.filter((it) => it.status === 'rejected').length,
  }), [items]);

  return (
    <AdminLayout title="Kelola Komentar Berita">
      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Workflow: <b>pending</b> → review admin → <b>approve/reject</b>. Hanya komentar yang disetujui tampil di halaman berita.
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {[
          ['pending', `Pending (${counts.pending})`],
          ['approved', `Disetujui (${counts.approved})`],
          ['rejected', `Ditolak (${counts.rejected})`],
          ['all', 'Semua'],
        ].map(([key, label]) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`rounded-lg px-3 py-1.5 text-sm ${tab === key ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500">Memuat data...</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">Belum ada komentar pada tab ini.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-slate-800">{item.nama}</p>
                  <p className="text-xs text-slate-500">{formatTanggalJamID(item.createdAt)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-1 text-xs ${
                    item.status === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : item.status === 'approved'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}>
                    {(item.status || 'pending').toUpperCase()}
                  </span>
                  <button onClick={() => handleDelete(item.id)} className="text-rose-600 hover:text-rose-700" title="Hapus permanen">
                    <i className="fas fa-trash" />
                  </button>
                </div>
              </div>
              <p className="text-slate-700 whitespace-pre-line rounded-lg bg-slate-50 p-3">{item.isi}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => moderate(item.id, 'approve')} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">Setujui</button>
                <button onClick={() => moderate(item.id, 'reject')} className="rounded-md bg-rose-600 px-3 py-1.5 text-xs text-white hover:bg-rose-700">Tolak</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
