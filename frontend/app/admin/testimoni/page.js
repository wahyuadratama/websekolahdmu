'use client';

import { useEffect, useMemo, useState } from 'react';
import AdminLayout from '@/components/AdminLayout';
import { API_URL } from '@/lib/config';
import { showError, showSuccess } from '@/lib/sweetalert';

const emptyItem = () => ({
  id: `tmn-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
  quote: '',
  name: '',
  role: '',
  source: '',
  year: '',
  status: 'pending',
  isVerified: false,
  isPublished: false,
});

export default function AdminTestimoniPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [tab, setTab] = useState('pending');

  const loadData = async () => {
    try {
      const res = await fetch(`${API_URL}/api/testimoni?all=1`, { credentials: 'include' });
      const data = await res.json();
      if (data?.success && Array.isArray(data?.data)) setItems(data.data);
    } catch (err) {
      showError(`Gagal memuat testimoni: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const updateItem = (id, key, value) => {
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, [key]: value } : it)));
  };

  const addItem = () => setItems((prev) => [emptyItem(), ...prev]);
  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id));

  const handleSaveAll = async () => {
    try {
      setSaving(true);
      const response = await fetch(`${API_URL}/api/testimoni`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ items }),
      });
      const data = await response.json();
      if (!response.ok || !data?.success) throw new Error(data?.message || 'Gagal menyimpan');
      setItems(data.data || []);
      showSuccess('Semua perubahan berhasil disimpan');
    } catch (err) {
      showError(err.message || 'Gagal menyimpan testimoni');
    } finally {
      setSaving(false);
    }
  };

  const moderate = async (id, action) => {
    try {
      const res = await fetch(`${API_URL}/api/testimoni/${id}/moderate`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ action }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.message || 'Gagal moderasi');
      setItems((prev) => prev.map((it) => (it.id === id ? data.data : it)));
      showSuccess(action === 'approve' ? 'Testimoni disetujui' : 'Testimoni ditolak');
    } catch (err) {
      showError(err.message || 'Gagal memoderasi testimoni');
    }
  };

  const filtered = useMemo(() => {
    if (tab === 'all') return items;
    return items.filter((it) => (it.status || 'approved') === tab);
  }, [items, tab]);

  return (
    <AdminLayout title="Kelola Testimoni">
      <div className="mb-5 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
        Workflow: <b>pending</b> → review admin → <b>approve/reject</b>. Hanya testimoni status approve yang tampil di website.
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-2">
        {[
          ['pending', 'Pending'],
          ['approved', 'Disetujui'],
          ['rejected', 'Ditolak'],
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

        <div className="ml-auto flex gap-2">
          <button onClick={addItem} className="rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700">Tambah</button>
          <button onClick={handleSaveAll} disabled={saving} className="rounded-lg bg-emerald-600 px-3 py-1.5 text-sm text-white hover:bg-emerald-700 disabled:opacity-60">
            {saving ? 'Menyimpan...' : 'Simpan Semua'}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="py-12 text-center text-slate-500">Memuat data...</div>
      ) : filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-500">Belum ada data pada tab ini.</div>
      ) : (
        <div className="space-y-4">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="font-semibold text-slate-800">{item.name || 'Testimoni baru'}</p>
                <div className="flex items-center gap-2">
                  <span className={`rounded-full px-2 py-1 text-xs ${
                    (item.status || 'approved') === 'pending'
                      ? 'bg-amber-100 text-amber-700'
                      : (item.status || 'approved') === 'approved'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-rose-100 text-rose-700'
                  }`}>
                    {(item.status || 'approved').toUpperCase()}
                  </span>
                  <button onClick={() => removeItem(item.id)} className="text-rose-600 hover:text-rose-700"><i className="fas fa-trash" /></button>
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                <input value={item.name || ''} onChange={(e) => updateItem(item.id, 'name', e.target.value)} placeholder="Nama/Inisial" className="rounded-lg border px-3 py-2" />
                <input value={item.role || ''} onChange={(e) => updateItem(item.id, 'role', e.target.value)} placeholder="Peran" className="rounded-lg border px-3 py-2" />
                <input value={item.source || ''} onChange={(e) => updateItem(item.id, 'source', e.target.value)} placeholder="Sumber" className="rounded-lg border px-3 py-2" />
                <input value={item.year || ''} onChange={(e) => updateItem(item.id, 'year', e.target.value)} placeholder="Tahun" className="rounded-lg border px-3 py-2" />
              </div>

              <textarea value={item.quote || ''} onChange={(e) => updateItem(item.id, 'quote', e.target.value)} rows={3} className="mt-3 w-full rounded-lg border px-3 py-2" placeholder="Isi testimoni" />

              <div className="mt-3 flex flex-wrap gap-2">
                <button onClick={() => moderate(item.id, 'approve')} className="rounded-md bg-emerald-600 px-3 py-1.5 text-xs text-white hover:bg-emerald-700">Approve</button>
                <button onClick={() => moderate(item.id, 'reject')} className="rounded-md bg-rose-600 px-3 py-1.5 text-xs text-white hover:bg-rose-700">Reject</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}
